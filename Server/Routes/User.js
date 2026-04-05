const express = require("express");
const router = express.Router();
const {UserRegister, Login ,GetUserProfile,GetAllUsers} = require("../Controller/User");
const {isAdmin} = require("../Middleware/isAdmin");
const isAuthenticat = require("../Middleware/Auth")
// New User Register
router.post("/register", UserRegister);
// Login Controller here
router.post("/login", Login);

router.get("/profile/:id",GetUserProfile);
router.get("/users",isAuthenticat,isAdmin,GetAllUsers)

module.exports = router 