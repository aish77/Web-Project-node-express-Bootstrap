var mongoose   = require("mongoose");
var campgrounds = require("./campground");
var comment = require("./comments");

var data = [
    {name:"Icy Ice Campground", image : "https://cdn.pixabay.com/photo/2018/05/16/15/49/camper-3406137__340.jpg", description:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)"},
    {name:"Open valley cold Campground", image :"https://cdn.pixabay.com/photo/2015/09/14/13/57/campground-939588__340.jpg" , description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident."},
    {name:"Lake Campground", image :"https://cdn.pixabay.com/photo/2016/08/28/17/05/camping-1626412__340.jpg" , description:"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains"},
    ];
function seedDB(){
    campgrounds.remove({}, function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("removed campgrounds!");
    }
});
data.forEach(function(seed){
    campgrounds.create(seed, function(err, campground){
        if(err){
            console.log(err);
        }
        else{
            console.log("New campground had been added!");
            comment.create({
        text : "This place is great, I hope there was internet",
        author: "Homer"
    }, function(err, comment){
        if(err){
            console.log(err);
        }
        else{
            campground.comments.push(comment);
            campground.save();
            console.log("Comment has been added to the campgrounds");
        }
    });
        }
    });

});
}

module.exports = seedDB;