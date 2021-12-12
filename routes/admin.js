const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Category = require("../models/Category");
const checkLogin = require("../middlewares/checkLogin");
// Tạo phòng/Khoa mới

function checkAdmin(req, res, next){
    role = req.data.role;
    if(role != "admin") return res.status(403).json("You have not permission")
    next();
}

router.post("/falcuties/create", async (req, res) => {    
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            email: req.body.name,
            name: req.body.email,
            role: "falcuty",
            username: req.body.username,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        res.status(200).json("success");
    }
    catch(err){ 
        res.status(500).json(err);
    }
})

//Tìm phòng/khoa
router.get("/falcuties/:id", checkLogin, async (req, res) => {
    var id = req.params.id;
    try{
        const falcuty = await Falcuty.findById(id).populate('user', {password: 0});
        res.status(200).json(falcuty);
    }
    catch(err){
        res.status(403).json(err); 
    }
})

router.get("/categories", async (req, res) => {
    try{
        const categories = await Category.find();
        res.status(200).json(categories);
    }
    catch(error){
        res.status(400).json({code: 400, message: "Đã có lỗi"})
    }
})

router.post("/categories/add", checkLogin, checkAdmin, async (req, res) => {
    try{
        const category = new Category({
            name: req.body.name
        })
        await category.save();
        res.status(200).json(category);
    }
    catch(error){
        res.status(400).json({code: 400, message: "Đã có lỗi"})
    }
})

module.exports = router;

