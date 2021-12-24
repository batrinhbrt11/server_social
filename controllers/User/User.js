const bcrypt = require("bcrypt");
const {
  checkLogin,
  checkUpdate,
  checkAdmin,
  checkFaculty,
} = require("../../Middleware/checktoken");

const User = require("../../models/User");

const PAGE_SIZE = 10;

const getUsers =  async (req, res, next) => {
    var page = req.query.page;
    if (page) {
      //get page
      page = parseInt(page);
      const skip_item = (page - 1) * PAGE_SIZE;
      User.find({})
        .skip(skip_item)
        .limit(PAGE_SIZE)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } else {
      //get all
      User.find({})
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    }
  }


  const createUser = async (req, res) => {
    try {
      const checkUser = await User.findOne({
        username: req.body.username,
      });
      if (!checkUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
        //create new user
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
          authorize: req.body.authorize,
          faculty: req.body.faculty,
        });
  
        //save user and respond
        const user = await newUser.save();
        res.status(200).json(user);
      } else {
        res.status("403").json("Đã có user");
      }
      //hashed password
    } catch (err) {
      res.status(500).json(err);
      console.log(err);
    }
  }


  const updateUser = async (req, res) => {
    if (req.body.password && req.body.newPassword) {
      try {
        const user = await User.findById(req.params.id);
        const validPassword = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (!validPassword) {
          res.status(403).json("Wrong password");
        } else {
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(req.body.newPassword, salt);
          const newUser = await User.findByIdAndUpdate(req.params.id, {
            password: hashedPassword,
          });
          await newUser.save();
          res.status(200).json("Account has been updated");
        }
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      try {
        const user = await User.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        // const value = req.body.value;
        // let array = [];
        // value.find((v) => {
        //   array.push(v.id);
        // });
        await user.save();
        res.status(200).json("Account has been updated");
      } catch (err) {
        return res.status(500).json(err);
      }
    }
  }

  const deleteUser = async (req, res) => {
    try {
      // await User.findByIdAndDelete(req.body.ids);
  
      const deleteIds = req.body.ids;
  
      await User.deleteMany({ _id: { $in: deleteIds } });
      User.find({})
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } catch (err) {
      return res.status(500).json(err);
    }
  }


  const getUserById = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      const { password, updatedAt, ...other } = user._doc;
      res.status(200).json(other);
    } catch (err) {
      res.status(500).json(err);
    }
  }


  const followUserById =  async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $push: { followers: req.body.userId } });
          await currentUser.updateOne({ $push: { followings: req.params.id } });
          res.status(200).json("user has been followed");
        } else {
          res.status(403).json("you allready follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant follow yourself");
    }
  }


  const unfollowUserById =  async (req, res) => {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followers: req.body.userId } });
          await currentUser.updateOne({ $pull: { followings: req.params.id } });
          res.status(200).json("user has been unfollowed");
        } else {
          res.status(403).json("you dont follow this user");
        }
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("you cant unfollow yourself");
    }
  }

  const getFriendById =  async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      console.log(user.followers);
      const friends = await Promise.all(
        user.followers.map((friendId) => {
          return User.findById(friendId);
        })
      );
  
      let friendList = [];
      friends.map((friend) => {
        const { _id, name, profilePicture } = friend;
        friendList.push({ _id, name, profilePicture });
      });
      res.status(200).json(friendList);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }

  module.exports = {getUsers, createUser,updateUser, deleteUser, getUserById, followUserById, unfollowUserById, getFriendById};