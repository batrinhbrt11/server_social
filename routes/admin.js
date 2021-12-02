const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
// Tạo phòng/Khoa mới
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
router.get("/falcuties/:id", async (req, res) => {
    var id = req.params.id;
    try{
        const falcuty = await Falcuty.findById(id).populate('user', {password: 0});
        res.status(200).json(falcuty);
    }
    catch(err){
        res.status(403).json(err); 
    }
})
module.exports = router;

