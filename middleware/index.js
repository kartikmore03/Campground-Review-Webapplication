var campground =require("../models/campground");
var comment =require("../models/comment");

//all the the middleware are goes here 
var middlewareObj={};

    middlewareObj.checkCampgroundOwnership=function(req,res,next){
            if(req.isAuthenticated()){
                campground.findById(req.params.id,function(err,foundcampground){
                    if(err){
                        req.flash("error","Campground not found");
                        res.redirect("back");
                    } else{
                    //does user own the campground?
                    if(foundcampground.author.id.equals(req.user._id)){
                        next();
                    }else{
                        req.flash("error","You don't have permission to do that");
                        res.redirect("back");
        
                    }
                    }
                 });
            }else{
                req.flash("error","You need to be logged in to do that");
                res.redirect("back");
            }
            
        }

middlewareObj.checkCommentOwnership= function checkCommentOwnership(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundcomment){
            if(err){
                res.redirect("back");
            } else{
            //does user own the comment?
            if(foundcomment.author.id.equals(req.user._id)){
                next();
            }else{
                req.flash("error","You don't have permission to do that");
                res.redirect("back");

            }
            }
         });
    }else{
        req.flash("error","You need to be logged in to do that");
        res.redirect("back");
    }
    
}

middlewareObj.isLoggedIn =function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged in to do that");
    res.redirect("/login");
}
module.exports=middlewareObj;