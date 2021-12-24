const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Category = require("../../models/Category");
const checkLogin = require("../../middlewares/checkLogin");
const Faculty = require("../../models/Faculty");

const getFalcuties = async (req, res) => {
    try {
      const falcuties = await User.find({ authorize: 2 })
        .select("-password")
        .sort({ createdAt: -1 });
      res.status(200).json(falcuties);
    } catch (err) {
      res.status(500).json(err);
    }
}

const postFalcuties = async (req, res) => {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      const newUser = new User({
        email: req.body.email,
        name: req.body.name,
        authorize: 2,
        username: req.body.username,
        password: hashedPassword,
        categories: req.body.categories,
      });
      const savedUser = await newUser.save();
      res.status(200).json(savedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  const findFalcuties = async (req, res) => {
    var id = req.params.id;
    try {
      const falcuty = await Falcuty.findById(id).populate("user", {
        password: 0,
      });
      res.status(200).json(falcuty);
    } catch (err) {
      res.status(403).json(err);
    }
  }

  

  module.exports = {getFalcuties , postFalcuties, findFalcuties}