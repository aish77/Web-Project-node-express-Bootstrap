var express                = require("express"),
    app                    = express(),
    bodyParser             = require("body-parser"),
    campgrounds            = require("./models/campground"),
    seedDB                 = require("./models/seeds"),
    mongoose               = require("mongoose"),
    comments               = require("./models/comments"),
    session                = require("express-session"),
    passport               = require("passport"),
    LocalStrategy          = require("passport-local"),
    User                   = require("./models/user"),
    passportLocalMongoose  = require("passport-local-mongoose");






mongoose.connect("mongodb://localhost:27017/campgroundsv3", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");


//Middleware for checking the currently signed in user
app.use(function(req, res, next){

    res.locals.currentUser = req.user;
    next();
});

seedDB();

//Passport configuration
 app.use(require("express-session")({
   secret: "table tennis",
    resave: false,    saveUninitialized: false
    }));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/", function(req, res){
   res.render("campgrounds/landing");
});

app.get("/campgrounds", function(req, res){
campgrounds.find({}, function(err, allcampgrounds){
    if(err){
        console.log(err);
    }
    else{
        res.render("campgrounds/campgrounds", {campgrounds:allcampgrounds, currentUser:req.user});
    }
});
});


app.post("/campgrounds",function(req,res){
var name = req.body.name;
var image = req.body.image;
var description =req.body.description;
var newCampground = {name :name, image :image, description :description};

campgrounds.create(newCampground, function(err, newlyCreated){
    if(err){
        console.log(err);
    }
    else{
        res.redirect("/campgrounds");
    }
});
});


app.get("/campgrounds/new", function(req,res){
res.render("campgrounds/new");
});

app.get("/campgrounds/:id", function(req,res){
   campgrounds.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
       if(err){
           console.log(err);
       }
       else{
           console.log(foundCampground);
           res.render("campgrounds/show", {campgrounds:foundCampground});
       }
   });
});


//Comments
app.get("/campgrounds/:id/comments/new",isLoggedIn, function(req, res){
campgrounds.findById(req.params.id, function(err, campgrounds){
    if(err){
        console.log(err);
    }
    else{
        res.render("comments/new", {campgrounds:campgrounds});
    }
});
});


app.post("/campgrounds/:id/comments", function(req, res){
    campgrounds.findById(req.params.id, function(err, campground){
        if(err){
            res.redirect("/campgrounds");
        }
        else{
            comments.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }
                else{
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }

            });
        }
    });

});



///AUTH ROuTES

// handeling user sign up
app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res){

    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/campgrounds");
        });
    });
});
// Login Form
app.get("/login", function(req, res){
    res.render("login");
});

// Login Logic
// middleware
app.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res){

});

// Logout
app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

// check isLoggedIn
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}



app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Campground server has started");
});