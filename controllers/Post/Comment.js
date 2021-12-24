const Post = require("../../models/Post");
const Comment = require("../../models/Comment");
const User = require("../../models/User");


const PAGE_SIZE = 10;

const createComment =  async (req, res) => {
    const newComment = new Comment(req.body);
    try {
      const savedComment = await newComment.save();
      res.status(200).json(savedComment);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  
const getCommentByPostId = async (req, res) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId });
      console.log(req.params.postId);
      const listComments = comments.sort((p1, p2) => {
      return new Date(p2.createdAt) - new Date(p1.createdAt);
      });
   
    //   // Tìm ra những cmt theo post, thì dùng vòng for này để tạo 1 obj chứa thông tin những user trong từng cmt đó, để frontend xử lý, ví dụ như đẩy ra avata.
    //   for (let index = 0; index < listComments.length; index++) {
    //     // cách 1
    //      listComments[index].userInfo = await User.findById( listComments[index].userId, 'username profilePicture'); // lấy mỗi username và avate để làm 1 cmt
    //      //cách 2 
    //     //  listComments[index].User = await User.findOne({id: listComments[index].userId}).select("-password")  // dùng loại trừ password

    //   }
    //   ko đẩy ra được Obj info của từng user cmt, chỉ lấy ra được cmt
      res.status(200).json(listComments);
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }

const updateComment = async (req, res) => {
    try {
      const comment = await Comment.findById(req.body._id);
   
      
      if (comment.userId === req.body.userId) {
        comment.content = req.body.content;
        
        const commentUpdated = await comment.save();
        res.status(200).json(commentUpdated);
      } else {
        res.status(403).json("you can update only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
const deleteComment = async (req, res) => {
    try {
    const comment = await Comment.findById(req.body._id);
      if (comment.userId === req.body.userId) {
        await comment.deleteOne();
        res.status(200).json("the post has been delete");
      } else {
        res.status(403).json("you can delete only your post");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }


module.exports = {createComment, getCommentByPostId, updateComment,deleteComment} 