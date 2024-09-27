var express=require("express");
var router=express.Router({mergeParams:true});
var campground =require("../models/campground");
var comment =require("../models/comment");
var middleware=require("../middleware");


//comments new
router.get("/new",middleware.isLoggedIn,function(req,res){
    //find campground by id
    console.log(req.params.id);
    campground.findById(req.params.id,function(err,campground){
        if(err){
            console.log(err);
        }else{
            res.render("comments/new",{campground:campground});  
        }
    })
     
});

//comments create
router.post("/",middleware.isLoggedIn,function(req,res){
      //lookup campground using ID
      campground.findById(req.params.id,function(err,campground){
           if(err){
              console.log(err) ;
              res.redirect("/campgrounds");
           }else{
               
             comment.create(req.body.comment,function(err,comment){
                if(err) {
                    req.flash("error","Something went wrong");
                    console.log()
                }else{
                    //add username and id to comment
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.createdAt = new Date();

                    //save comment
                    comment.save();
                    campground.comments.push(comment);
                    campground.save(); 
                    console.log(comment);
                    req.flash("success","Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
             });
           }
      });
      //create new comment
      //connect new comment to campground
      //redirect to campground to show page
});

//comment edit route
router.get("/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
     comment.findById(req.params.comment_id,function(err,foundcomment){
       if(err){
           res.redirect("back");
       }else{
        res.render("comments/edit",{campground_id: req.params.id,comment:foundcomment});
       }
     });
});

// comment update
router.put("/:comment_id",middleware.checkCommentOwnership,function(req,res){
   comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else{
            res.redirect("/campgrounds/" + req.params.id);
        }
   });
});

//comment destroy route
router.delete("/:comment_id",middleware.checkCommentOwnership,function(req,res){
    //findByIdAndRemove
    comment.findByIdAndRemove(req.params.comment_id,function(err){
      if(err){
          res.redirect("back");
      }else{
        req.flash("success","Comments deleted");
        res.redirect("/campgrounds/" + req.params.id);
      }  
    });
});



function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err){
                res.redirect("back");
            } else{
            //does user own the comment?
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            }else{
                res.redirect("back");

            }
            }
         });
    }else{
        res.redirect("back");
    }
    
}

module.exports = router;
