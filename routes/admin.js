const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const checkLogin = require("../middlewares/checkLogin");
const Faculty = require("../models/Faculty");
// Tạo phòng/Khoa mới

const checkAdmin = require("../controllers/Admin/CheckAdmin")
const {getFalcuties, postFalcuties, findFalcuties}  = require("../controllers/Admin/Falcuties.js")
const {getCategory,updateCategory, addCategory, deleteCategory} = require("../controllers/Admin/Category.js")
const {getFalcuty, updateFalcuty, addFalcuty, deleteFalcuty} = require("../controllers/Admin/Falcuty.js");


router.get("/falcuties", checkLogin, checkAdmin, getFalcuties);
router.post("/falcuties", checkLogin, checkAdmin, postFalcuties);
//Tìm phòng/khoa
router.get("/falcuties/:id", checkLogin, findFalcuties);
//get  categories
router.get("/categories", getCategory);
//update category
router.put("/categories/:id", checkLogin, checkAdmin, updateCategory);
//add category
router.post("/categories/add", checkLogin, checkAdmin, addCategory);
//delete category
router.delete(
  "/categories/delete",
  checkLogin,
  checkAdmin,
  deleteCategory
);

//get Faculty

router.get("/faculties", getFalcuty);
//update faculty
router.put("/faculties/:id", checkLogin, checkAdmin, updateFalcuty );
//add faculty
router.post("/faculties/add", checkLogin, checkAdmin, addFalcuty);
//delete category
router.delete("/faculties/delete", checkLogin, checkAdmin, deleteFalcuty);
module.exports = router;
