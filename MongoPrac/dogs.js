var mongoose = require("mongoose");
var connection = mongoose.connect('mongodb://localhost:27017/database_dogs', { useNewUrlParser: true });
var dogSchema= new mongoose.Schema({
   name : String,
   age : Number,
   temprament : String
});
var dog = mongoose.model("dog", dogSchema);
dog.create({
    name:"Lucky",
    age:10,
    temprament:"bland"
}, function(err,dog){
    if(err){
        console.log("oops something went wrong");
    }
    else{
        console.log("new dog is added to the database");
        console.log(dog);
    }
});