const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkLogin = require("../../middlewares/checkLogin")
const _Config = require("../../common/config");
module.exports = async (req, res) => {
    try {
      const user = await User.findOne({ username: req.body.username });
      console.log(req.body.username);
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
  }