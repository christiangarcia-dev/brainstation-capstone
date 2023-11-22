// authController 
const bcrypt = require('bcrypt');
const passport = require('passport');
const UserModel = require('../models/user'); // Replace with your user model path

const register = async (req, res) => {
    console.log(req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword
        };
        // Use your user model's method to save newUser to the database
        await UserModel.createUser(newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: "Error registering new user", error: error.message });
    }
};


const login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) { return next(err); }
        if (!user) { return res.status(400).json({ message: info.message }); }
        req.logIn(user, (err) => {
            if (err) { return next(err); }
            return res.status(200).json({ message: "Logged in successfully" });
        });
    })(req, res, next);
};

const logout = (req, res) => {
    req.logout();
    res.status(200).json({ message: "Logged out successfully" });
};

const checkAuthStatus = (req, res) => {
    if (req.isAuthenticated()) {
        res.status(200).json({ message: "User is authenticated", user: req.user });
    } else {
        res.status(401).json({ message: "User is not authenticated" });
    }
};

module.exports = {
    register,
    login,
    logout,
    checkAuthStatus
};
