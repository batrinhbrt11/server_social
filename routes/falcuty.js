const router = require("express").Router();
const User = require("../models/User");
const Notification = require("../models/falcutyNotification");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middlewares/checkLogin");
dotenv.config();


function checkFalcuty(req, res, next) {
  authorize = req.data.authorize;
  if (authorize !== 2) res.status(403).json("You have not permission");
  next();
}

// Thông báo
router.get("/notifications", checkLogin, checkFalcuty, async (req, res) => {
  try {
    const notifications = await Notification.find({ falcutyId: req.data.id });
    res.status(200).json({ notifications });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/notifications/:id", checkLogin, checkFalcuty, async (req, res) => {
  try {
    let id = req.params.id;
    const notification = await Notification.findById(id);
    if (!notification) res.status(404).json("Not found");
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/notifications", checkLogin, checkFalcuty,async (req, res) => {
    try {
        const checkCategory = await User.findOne({categories: {_id: req.body.categoryId}});
        console.log("ádasad",checkCategory);
        if(!checkCategory) res.status(404).json("Bạn không có quyền đăng thông báo cho chuyên mục này.");
        const newNotification = new Notification({
            title: req.body.title,
            content: req.body.content,
            categoryId: req.body.categoryId,
            falcutyId: req.data._id,
          });
          const savedNotification = await newNotification.save();
          res.status(200).json(savedNotification);
    } catch (error) {
        res.status(500).json(error);
    } 
  }
);

// Update notification
router.put("/notifications/:id", checkLogin, checkFalcuty, async (req, res) => {
  try {
    const id = req.params.id;
    const notification = await Notification.findOne({
      _id: id,
      falcutyId: req.data.id,
    });
    if (!notification) res.status(404).json("Not found");
    await notification.updateOne({
      $set: { title: req.body.title, content: req.body.content },
    });
    res.status(200).json(notification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete notification
router.delete(
  "/notifications/:id",
  checkLogin,
  checkFalcuty,
  async (req, res) => {
    try {
      const id = req.params.id;
      const notification = await Notification.findOne({
        _id: id,
        falcutyId: req.data.id,
      });
      if (!notification) res.status(404).json("Not found");
      notification.deleteOne().then((data) => {
        res.status(200).json("Deleted successfully");
      });
    } catch (error) {}
  }
);
module.exports = router;
