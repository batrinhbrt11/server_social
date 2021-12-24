const User = require("../../models/User");
const Notification = require("../../models/falcutyNotification");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const Category = require("../../models/Category");
const jwt = require("jsonwebtoken");
const checkLogin = require("../../middlewares/checkLogin.js");
const checkFalcuty =  require("../../controllers/Falcuty/checkFalcuty.js")



const getNotifications = async (req, res) => {
    try {
      const notifications = await Notification.aggregate([
        {$match: {userId: req.data._id} },
        { $sort : { createdAt: -1 } },
        {
          $lookup:
          {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as:"category"
          }
      }]);
      res.status(200).json(notifications);
    } catch (error) {
      res.status(500).json(error);
    }
}
const getNotificationById = async (req, res) => {
    try {
      let id = req.params.id;
      const notification = await Notification.findById(id);
      if (!notification) res.status(404).json("Not found");
      res.status(200).json(notification);
    } catch (error) {
      res.status(500).json(error);
    }
}
const getCategory =  async (req, res) => {
    try {
      const user = await User.aggregate([
        { $match: { _id: req.data._id } },
        {
          $lookup:
          {
            from: "categories",
            localField: "categories._id",
            foreignField: "_id",
            as: "category"
          }
        },
        {$project: {_id: 0, category: 1}}
      ]);
      if (!user) res.status(404).json("Not found");
      res.status(200).json(user[0].category);
    } catch (error) {
      res.status(500).json(error);
    }
  }
const createNotification = async (req, res) => {
    try {
        const checkCategory = await User.findOne({categories: {_id: req.body.categoryId}});
        if(!checkCategory) res.status(200).json({code: -1, message: "Bạn không có quyền đăng thông báo cho chuyên mục này."});
        const newNotification = new Notification({
            title: req.body.title,
            content: req.body.content,
            categoryId: req.body.categoryId,
            userId: req.data._id,
          });
          const savedNotification = await newNotification.save();
          res.status(200).json({code: 1, message: "Thành công"});
    } catch (error) {
        res.status(400).json("Vui lòng nhập đầy đủ thông tin.");
        console.log("1111")
    } 
}
const updateNotificationById = async (req, res) => {
    try {
      const id = req.params.id;
      const notification = await Notification.findOne({
        _id: id,
        falcutyId: req.data.id,
      });
      //Validate input
      if(!req.body.title || req.body.title.length === 0 || !req.body.content || req.body.content.length === 0 || !req.body.categoryId || req.body.categoryId.length === 0 ) {
        res.status(200).json({code: 0, message: `Vui lòng điền đầy đủ thông tin.`});
      }
      //Kiểm tra thông báo có tồn tại không 
      if (!notification) res.status(200).json({code: -1, message: "Thông báo không tồn tại."})
  
      //Kiểm tra người dùng có quyền đăng vào chuyên mục này không
      const checkCategory = await User.findOne({categories: {_id: req.body.categoryId}});
      if(!checkCategory) res.status(200).json({code: -1, message: "Bạn không có quyền đăng thông báo cho chuyên mục này."});
      await notification.updateOne({
        $set: { title: req.body.title, content: req.body.content },
      });
      res.status(200).json({code: 1, message: `Thông báo "${notification.title}" đã được cập nhật thành công`});
    } catch (error) {
      res.status(200).json({code: 0, message: `Vui lòng điền đầy đủ thông tin.`});
    }
  }
const deleteNotification =   async (req, res) => {
    try {
      const id = req.params.id;
      const notification = await Notification.findOne({
        _id: id,
        falcutyId: req.data.id,
      });
      if (!notification) res.status(404).json("Not found");
      notification.deleteOne().then((data) => {
        res.status(200).json(`Xóa thông báo "${notification.title}" thành công.`);
      });
    } catch (error) {}
  }






module.exports = {getNotifications , getNotificationById, getCategory, createNotification, updateNotificationById, deleteNotification}