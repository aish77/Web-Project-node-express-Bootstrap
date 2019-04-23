var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}))
app.set("view engine", "ejs");
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/database_campgrounds', { useNewUrlParser: true });
var campgroundSchema= new mongoose.Schema({
    name : String,
    image : String,
    description:String
 });
var campgrounds = mongoose.model("campgrounds", campgroundSchema);

app.get("/", function(req, res){
   res.render("landing");
});

app.get("/campgrounds", function(req, res){
campgrounds.find({}, function(err, allcampgrounds){
    if(err){
        console.log(err);
    }
    else{
        res.render("campgrounds", {campgrounds:allcampgrounds})
    }
})
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
})
});


app.get("/campgrounds/new", function(req,res){
res.render("new");
});

app.get("/campgrounds/:id", function(req,res){
   campgrounds.findById(req.params.id, function(err, foundCampground){
       if(err){
           console.log(err);
       }
       else{
           res.render("show", {campgrounds:foundCampground});
       }
   })
});
app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Campground server has started");
});