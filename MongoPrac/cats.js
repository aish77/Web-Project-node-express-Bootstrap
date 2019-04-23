var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://localhost:27017/my_database', { useNewUrlParser: true });

var Schema = mongoose.Schema;
var User = new Schema({
    author    : String
  , type      : String
});

var MyUserModel = mongoose.model('User', User); //create and access the model User

var u = new MyUserModel();
u.author = 'authorname';
u.save(function(err){
    if (err) console.log(err);
});
MyUserModel.create({
    name:"Snow White",
    age:"15",
    temprament:"bland"
},function(err, cat){
    if(err){
        console.log(err);
    }
    else{
        console.log(cat);
    }
});
MyUserModel.find({}, function(err, users){
    if(err){
        console.log(err);
        }
        else{
            console.log(users);
        }
});