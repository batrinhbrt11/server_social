const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
//Create User
//api/auth/register
router.post("/register", async (req, res) => {
  try {
    //hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //create new user
    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role
    });

    //save user and respond
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Login
//api/auth/login
router.post("/login", async(req, res) => {
  try{
      const user = await User.findOne({ username: req.body.username });
      if (!user) {
          res.status(404).json("user not found");
      } 
      else {
          const isMatched = bcrypt.compareSync(req.body.password, user.password);
          if (!isMatched) {
            res.status(403).json({code: 403, message:"Wrong password"});
          } 
          else {
              const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN_SECRET);
              res.status(200).json({token});
          }
      }
  }
  catch(err){
      res.status(500).json(err);
  }
})

module.exports = router;
