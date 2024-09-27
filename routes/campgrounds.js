var express=require("express");
var router=express.Router();
var campground = require("../models/campground");
var middleware=require("../middleware");


//Index - show all campgrounds
router.get("/",function(req,res){
    //get all campgrounds from DB
    campground.find({},function(err,allCampgrounds){
       if(err){
           console.log(err);
       }else{
          res.render("campgrounds/index",{campgrounds:allCampgrounds});
       }
    });
});


//create-add new campground to DB
router.post("/",middleware.isLoggedIn,function(req,res){
    //get data from form and add to campground array
    var name=req.body.name;
    var image=req.body.image;
    var mobile=req.body.mobile;
    var desc=req.body.description;
    var charges = req.body.charges;
    var date = new Date();
    var author={
        id:req.user._id,
        username:req.user.username
    }
    var newCampground={name:name ,image:image,description:desc, author:author,mobile:mobile,charges:charges,createdAt:date};
    
    //create a new campground and save to DB 
    campground.create(newCampground,function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            //redirect back to camground page
             console.log(newlyCreated);
             res.redirect("/campgrounds");
        }
    });
});

//New-show form to create new campground 
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});


//show-show more info about  one campground
router.get("/:id",function(req,res){
    //find the campground with provided ID
    campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground) {
        if(err){
            console.log(err);
        }
        else{
            console.log(foundcampground);
            res.render("campgrounds/show.ejs",{campground:foundcampground});
            
        }
    });
});

//edit campground route 
router.get("/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
        campground.findById(req.params.id,function(err,foundcampground){
                res.render("campgrounds/edit",{campground:foundcampground});
        });
});

//update campground route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    //find and update the correct campground
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
    //redirect somewhere(show page)
});

// destory campground route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res) {
    campground.findByIdAndRemove(req.params.id,function(err) {
        if(err){
            res.redirect("back");
        }
        else{
            res.redirect("/campgrounds/");
            
        }
    })
    
});



module.exports = router;
