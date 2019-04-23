var express     = require("express");
    app         = express();
    bodyParser  = require("body-parser");
    campgrounds = require("./models/campground");
    seedDB      = require("./models/seeds");
    mongoose    = require("mongoose");
    comments    = require("./models/comments");

    seedDB();


app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");
mongoose.connect('mongodb://localhost:27017/database_campgrounds', { useNewUrlParser: true });


app.get("/", function(req, res){
   res.render("campgrounds/landing");
});

app.get("/campgrounds", function(req, res){
campgrounds.find({}, function(err, allcampgrounds){
    if(err){
        console.log(err);
    }
    else{
        res.render("campgrounds/campgrounds", {campgrounds:allcampgrounds});
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
app.get("/campgrounds/:id/comments/new", function(req, res){
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
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Campground server has started");
});