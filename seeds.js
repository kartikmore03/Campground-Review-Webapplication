var mongoose=require("mongoose");
var campground=require("./models/campground");
var comment = require("./models/comment")

var data=[
    {
        name:"Cloud's Rest",
        image:"https://northeastohiofamilyfun.com/wp-content/uploads/2020/05/Campgrounds-in-Ohio.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ratione sunt culpa blanditiis commodi cum minima odit sapiente similique repellat consequatur odio sed aspernatur saepe cupiditate. Excepturi ipsum eligendi quos cumque eos corrupti reprehenderit ut tempora inventore praesentium quam rerum adipisci laboriosam, dignissimos labore assumenda itaque facere nulla totam similique incidunt alias! Beatae dolor quas consequatur illo modi tenetur temporibus illum distinctio officia cumque laudantium atque, non repudiandae consectetur deserunt. Quidem est sed quos. Id accusamus labore mollitia reiciendis earum! Sint ut sed molestiae eligendi aperiam velit? Doloremque, fuga repellendus animi impedit, illum amet, voluptas reiciendis iusto alias esse explicabo?"
    },
    {
        name:"Desert mesa",
        image:"https://northeastohiofamilyfun.com/wp-content/uploads/2020/05/Campgrounds-in-Ohio.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ratione sunt culpa blanditiis commodi cum minima odit sapiente similique repellat consequatur odio sed aspernatur saepe cupiditate. Excepturi ipsum eligendi quos cumque eos corrupti reprehenderit ut tempora inventore praesentium quam rerum adipisci laboriosam, dignissimos labore assumenda itaque facere nulla totam similique incidunt alias! Beatae dolor quas consequatur illo modi tenetur temporibus illum distinctio officia cumque laudantium atque, non repudiandae consectetur deserunt. Quidem est sed quos. Id accusamus labore mollitia reiciendis earum! Sint ut sed molestiae eligendi aperiam velit? Doloremque, fuga repellendus animi impedit, illum amet, voluptas reiciendis iusto alias esse explicabo?"
    },
    {
        name:"Canyon Floor",
        image:"https://northeastohiofamilyfun.com/wp-content/uploads/2020/05/Campgrounds-in-Ohio.jpg",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam, ratione sunt culpa blanditiis commodi cum minima odit sapiente similique repellat consequatur odio sed aspernatur saepe cupiditate. Excepturi ipsum eligendi quos cumque eos corrupti reprehenderit ut tempora inventore praesentium quam rerum adipisci laboriosam, dignissimos labore assumenda itaque facere nulla totam similique incidunt alias! Beatae dolor quas consequatur illo modi tenetur temporibus illum distinctio officia cumque laudantium atque, non repudiandae consectetur deserunt. Quidem est sed quos. Id accusamus labore mollitia reiciendis earum! Sint ut sed molestiae eligendi aperiam velit? Doloremque, fuga repellendus animi impedit, illum amet, voluptas reiciendis iusto alias esse explicabo?"
    }
]

function seedDB(){
    //Remove all campgrounds
    campground.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        //add few campgrounds
        data.forEach(function(seed){
            campground.create(seed,function(err,campground){
                if(err){
                    console.log(err);
                }else {
                    console.log("added a campground");

                    //create a comment
                    comment.create(
                        {
                            text:"This palce is great,but i wish  there was internet",
                            author:"Homer"
                        }, function (err,comment){
                            if(err){
                                console.log(err);
                            }else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("Created new comment");
                            }
                           
                        });
                }
            });
        });
        
    });
    
} 
   

module.exports=seedDB;