const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const check = require("../Middleware/checktoken");
const jwt = require("jsonwebtoken");
const _Config = require("../common/config");
//Create User
//api/auth/register
router.post("/register", async (req, res) => {
  try {
      const checkUser = await User.findOne({
      email: "googleId:" + req.body.authId,
    });
    if (!checkUser) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      //create new user
      const newUser = new User({
        username: req.body.username,
        authId: "googleId:" + req.body.authId,
        profilePicture: req.body.profilePicture,
        email: req.body.email,
        password: hashedPassword,
      });

      //save user and respond
      const user = await newUser.save();
      res.status(200).json(user);
    }
    //hashed password
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

//Login
//api/auth/login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      res.status(400).json("user not found");
    } else {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(404).json("wrong password");
      } else {
        const a = {
          _id: user._id,
          _authorize: user.authorize,
          _faculty: user.faculty,
        };
        var token = jwt.sign(a, _Config.SECRET);
        const res_data = { token, user };
        res.status(200).json(res_data);
      }
    }
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});

module.exports = router;
