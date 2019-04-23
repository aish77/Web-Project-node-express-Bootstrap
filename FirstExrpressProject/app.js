var express = require('express');
var app = express();

app.get("/",function(req,res){
    res.send("<h1>Hello There</h1>");
})
app.get("/love/:Aishwary",function(req, res){
    var sounds = {
        cow :"Moo",
        buffallo : "Maa",
        dog : "Bow Bow",
        cat : "Meow"
    }
    times = "";
    var aish = req.params.Aishwary;
    for (var i=0 ; i<5;i++){
        times +=aish;
    }

    res.send(times);
})
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server Has Started");
    })