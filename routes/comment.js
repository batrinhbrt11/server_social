const router = require("express").Router();
const Comment = require("../models/Comment");
const User = require("../models/User");

const {
    checkLogin,
    checkUpdate,
    checkAdmin,
    checkFaculty,
  } = require("../Middleware/checktoken");

const {createComment, getCommentByPostId, updateComment, deleteComment, likeComment, getCommentById, getCommentByUserId} = require("../controllers/Post/Comment.js")


//create Comment
router.post("/", checkLogin,createComment);
//get timeline Comment
router.get("/:postId", getCommentByPostId);

//update Comment
 router.put("/", checkLogin, updateComment);
// //delete Comment
 router.delete("/",checkLogin, deleteComment);
// //like Comment

// router.put("/:id/like", checkLogin, likeComment);
// //get Comment
// router.get("/:id", checkLogin,getCommentById);

// //get user's Comment
// router.get("/profile/:userId", checkLogin,getCommentByUserId );
module.exports = router;
