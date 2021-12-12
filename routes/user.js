const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  checkLogin,
  checkUpdate,
  checkAdmin,
  checkFaculty,
} = require("../Middleware/checktoken");
//get user
const PAGE_SIZE = 10;
router.get("/", checkLogin, async (req, res, next) => {
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
});
//update user
router.put("/:id", checkUpdate, async (req, res) => {
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
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

//delete user
router.delete("/:id", checkAdmin, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.authorize !== 1) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(403).json("You can delete only your account!");
  }
});

//get a user
router.get("/:id", checkLogin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
//follow a user

router.put("/:id/follow", async (req, res) => {
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
});

//unfollow a user

router.put("/:id/unfollow", async (req, res) => {
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
});
//get friend
router.get("/friends/:userId", checkLogin, async (req, res) => {
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
      const { _id, username, profilePicture } = friend;
      friendList.push({ _id, username, profilePicture });
    });
    res.status(200).json(friendList);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
module.exports = router;
