const router = require("express").Router();

// call controller 

const Register = require('../controllers/Auth/Register')
const LoginUser = require('../controllers/Auth/Login')
const Logout = require('../controllers/Auth/Logout')
const ChangePassword = require("../controllers/Auth/ChangePassword")



//Create User
//api/auth/register
router.post("/register", Register);

//Login
//api/auth/login
router.post("/login", LoginUser);

module.exports = router;
