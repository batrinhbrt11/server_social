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

router.get("/falcuties", checkLogin, checkAdmin, async (req, res) => {
  try {
    const falcuties = await User.find({ authorize: 2 })
      .select("-password")
      .sort({ createdAt: -1 });
    res.status(200).json(falcuties);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/falcuties", checkLogin, checkAdmin, async (req, res) => {
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
});

//Tìm phòng/khoa
router.get("/falcuties/:id", checkLogin, async (req, res) => {
  var id = req.params.id;
  try {
    const falcuty = await Falcuty.findById(id).populate("user", {
      password: 0,
    });
    res.status(200).json(falcuty);
  } catch (err) {
    res.status(403).json(err);
  }
});
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
    const faculties = await Faculty.find();
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
