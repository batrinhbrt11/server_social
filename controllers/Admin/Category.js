const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Category = require("../../models/Category");
const checkLogin = require("../../middlewares/checkLogin");
const Faculty = require("../../models/Faculty");


const getCategory = async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ code: 400, message: "Đã có lỗi" });
    }
}
const updateCategory = async (req, res) => {
    try {
      const cate = await Category.findById(req.params.id);
      await cate.updateOne({ name: req.body.name.toUpperCase() });
      res.status(200).json(cate);
    } catch (err) {
      res.status(500).json(err);
    }
  }

const addCategory = async (req, res) => {
    try {
      const checkCate = await Category.findOne({
        name: req.body.name.toUpperCase(),
      });
      if (checkCate) {
        res.status("403").json("Đã có user");
      } else {
        const category = new Category({
          name: req.body.name.toUpperCase(),
        });
        await category.save();
        res.status(200).json(category);
      }
    } catch (error) {
      res.status(400).json({ code: 400, message: "Đã có lỗi" });
    }
  }

const deleteCategory = async (req, res) => {
  try {
    const deleteIds = req.body.ids;

    await Category.deleteMany({ _id: { $in: deleteIds } });
    Category.find({})
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

module.exports = {getCategory, updateCategory,addCategory, deleteCategory}