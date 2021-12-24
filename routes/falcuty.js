const router = require("express").Router();
const User = require("../models/User");
const Notification = require("../models/falcutyNotification");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Category = require("../models/Category");
const jwt = require("jsonwebtoken");
const checkLogin = require("../middlewares/checkLogin.js");
const checkFalcuty =  require("../controllers/Falcuty/checkFalcuty.js")
const { getNotifications , getNotificationById, getCategory, createNotification, updateNotificationById, deleteNotification } = require("../controllers/Falcuty/Notification.js");
dotenv.config();



// Thông báo
router.get("/notifications", checkLogin, checkFalcuty, getNotifications);

router.get("/notifications/:id", checkLogin, checkFalcuty, getNotificationById);

router.get("/categories", checkLogin, checkFalcuty,getCategory);

router.post("/notifications", checkLogin, checkFalcuty, createNotification);

// Update notification
router.put("/notifications/:id", checkLogin, checkFalcuty, updateNotificationById);

//Delete notification
router.delete(
  "/notifications/:id",
  checkLogin,
  checkFalcuty,
  deleteNotification
);
module.exports = router;
