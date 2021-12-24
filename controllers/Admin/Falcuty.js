const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Category = require("../../models/Category");
const checkLogin = require("../../middlewares/checkLogin");
const Faculty = require("../../models/Faculty");


const getFalcuty = async (req, res) => {
    try {
      const faculties = await Faculty.find();
      res.status(200).json(faculties);
    } catch (error) {
      res.status(400).json({ code: 400, message: "Đã có lỗi" });
    }
}
const updateFalcuty = async (req, res) => {
    try {
      const fac = await Faculty.findById(req.params.id);
      await fac.updateOne({ name: req.body.name.toUpperCase() });
      res.status(200).json(fac);
    } catch (err) {
      res.status(500).json(err);
    }
  }
const addFalcuty = async (req, res) => {
    try {
      const checkFac = await Faculty.findOne({
        name: req.body.name.toUpperCase(),
      });
      if (checkFac) {
        res.status("403").json("Đã có user");
      } else {
        const fac = new Faculty({
          name: req.body.name.toUpperCase(),
        });
        await fac.save();
        const category = new Category({
          name: req.body.name.toUpperCase(),
        });
        await category.save();
        res.status(200).json(fac);
      }
    } catch (error) {
      res.status(400).json({ code: 400, message: "Đã có lỗi" });
    }
  }
const deleteFalcuty = async (req, res) => {
    try {
      const deleteIds = req.body.ids;
  
      await Faculty.deleteMany({ _id: { $in: deleteIds } });
      Faculty.find({})
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
    } catch (err) {
      return res.status(500).json(err);
    }
  }

module.exports = { getFalcuty, updateFalcuty, addFalcuty, deleteFalcuty}