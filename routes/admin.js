const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const checkLogin = require("../middlewares/checkLogin");
const Faculty = require("../models/Faculty");
// Tạo phòng/Khoa mới

function checkAdmin(req, res, next) {
  if (req.data.authorize !== 1) res.status(403).json("You have not permission");
  next();
}

//get  categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ code: 400, message: "Đã có lỗi" });
  }
});
//update category
router.put("/categories/:id", checkLogin, checkAdmin, async (req, res) => {
  try {
    const cate = await Category.findById(req.params.id);
    await cate.updateOne({ name: req.body.name.toUpperCase() });
    res.status(200).json(cate);
  } catch (err) {
    res.status(500).json(err);
  }
});
//add category
router.post("/categories/add", checkLogin, checkAdmin, async (req, res) => {
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
});
//delete category
router.delete(
  "/categories/delete",
  checkLogin,
  checkAdmin,
  async (req, res) => {
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
);

//get Faculty

router.get("/faculties", async (req, res) => {
  try {
    const faculty = await Faculty.find();
    res.status(200).json(faculty);
  } catch (error) {
    res.status(400).json({ code: 400, message: "Đã có lỗi" });
  }
});
router.get("/faculties/:id", async (req, res) => {
  try {
    const faculties = await Faculty.findById(req.params.id);
    res.status(200).json(faculties);
  } catch (error) {
    res.status(400).json({ code: 400, message: "Đã có lỗi" });
  }
});
//update faculty
router.put("/faculties/:id", checkLogin, checkAdmin, async (req, res) => {
  try {
    const fac = await Faculty.findById(req.params.id);
    await fac.updateOne({ name: req.body.name.toUpperCase() });
    res.status(200).json(fac);
  } catch (err) {
    res.status(500).json(err);
  }
});
//add faculty
router.post("/faculties/add", checkLogin, checkAdmin, async (req, res) => {
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
});
//delete category
router.delete("/faculties/delete", checkLogin, checkAdmin, async (req, res) => {
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
});
module.exports = router;
