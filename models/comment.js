var mongoose=require("mongoose");

var CommentSchema=new mongoose.Schema({
    text:String,
    createdAt:Date,
    author:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username: String
    }
});

module.exports = mongoose.model("Comment",CommentSchema);