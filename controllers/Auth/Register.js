const User = require("../../models/User");
const bcrypt = require("bcrypt");
const check = require("../../Middleware/checktoken");
const jwt = require("jsonwebtoken");
const _Config = require("../../common/config");


module.exports =  async (req, res) => {
    try {
      const checkUser = await User.findOne({
        authId: "googleId:" + req.body.authId,
      });
      if (!checkUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
        //create new user
        const newUser = new User({
          name: req.body.name,
          username: req.body.username,
          authId: "googleId:" + req.body.authId,
          profilePicture: req.body.profilePicture,
          email: req.body.email,
          password: hashedPassword,
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