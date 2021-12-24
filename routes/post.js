const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const {
  checkLogin,
  checkUpdate,
  checkAdmin,
  checkFaculty,
} = require("../Middleware/checktoken");
const {createPost, getTimeLinePost, updatePost, deletePost, likePost, getPostById, getPostByUserId} = require("../controllers/Post/Post.js")
// const {
//   createComment,
//   fetchComments,
//   likeDislikeComment,
//   createReply
// } = require('../controllers/Post/Comment')


const PAGE_SIZE = 10;
//create post
router.post("/", checkLogin,createPost);
//get timeline post
router.get("/timeline", checkLogin, getTimeLinePost);

//update post
router.put("/:id", checkLogin, updatePost);
//delete post
router.delete("/:id", deletePost);
//like post

router.put("/:id/like", checkLogin, likePost);
//get post
router.get("/:id", checkLogin,getPostById);

//get user's post
router.get("/profile/:userId", checkLogin,getPostByUserId );
module.exports = router;
