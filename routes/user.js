const User = require("../models/User");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const {
  checkLogin,
  checkUpdate,
  checkAdmin,
  checkFaculty,
} = require("../Middleware/checktoken");
const {getUsers, createUser,updateUser, deleteUser, getUserById, followUserById, unfollowUserById, getFriendById} = require("../controllers/User/User.js")




//get user

router.get("/", checkLogin,getUsers);
//create user
router.post("/", checkAdmin,createUser);
//update user
router.put("/:id", checkUpdate,updateUser);

//delete user
router.delete("/", checkAdmin, deleteUser);

//get a user
router.get("/:id", checkLogin,getUserById);
//follow a user

router.put("/:id/follow",followUserById);

//unfollow a user

router.put("/:id/unfollow",unfollowUserById);
//get friend
router.get("/friends/:userId", checkLogin,getFriendById);
module.exports = router;
