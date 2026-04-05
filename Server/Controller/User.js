const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../Model/User");
const { body, validationResult } = require("express-validator");


exports.UserRegister = [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let { name, email, password, role } = req.body;
            let user = await User.findOne({ email: email });

            if (user) {
                return res.status(409).json({
                    success: false,
                    message: "User Already Register Please Login"
                });
            }

            let Salt = await bcrypt.genSalt(10);
            let hassedPaswword = await bcrypt.hash(password, Salt);

            let newUser = await User.create({ name, email, password: hassedPaswword, role });
            const token = jwt.sign({ id: newUser._id, role: newUser.role }, "RajDanish");

            res.status(201).json({
                success: true,
                message: "User Created Successfully",
                user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role },
                token
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Error While Register User",
                error: err.message
            });
        }
    }
];


exports.Login = [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters").isLength({ min: 5 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let { email, password } = req.body;
            let user = await User.findOne({ email: email });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User Not Found"
                });
            }

            let IsMatch = await bcrypt.compare(password, user.password);
            if (!IsMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid Email or Password"
                });
            }

            const token = jwt.sign({ id: user._id, role: user.role }, "RajDanish");

            res.status(200).json({
                success: true,
                message: "User login Successfully Welcome Back!",
                user: { id: user._id, name: user.name, email: user.email, role: user.role },
                token
            });
        } catch (err) {
            res.status(500).json({
                success: false,
                message: "Error during Login",
                error: err.message
            });
        }
    }
];


exports.GetUserProfile = async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id }).select("name email createdAt role");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "User Found",
            user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "User Not found",
            error: err.message
        });
    }
};


exports.GetAllUsers = async (req, res) => {
    try {
        let user = await User.find({}).select("name email role createdAt");

        if (!user || user.length === 0) {
            return res.status(404).json({
                success: false,
                message: "All User Not Found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Users found",
            user: user
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error while fetching all user",
            error: err.message
        });
    }
};
