const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

const User = require("../models/User");

// Login
router.post("/login", async (req, res) => {

    // Destructure the body
    const { email, password } = req.body;

    try {
        // Check if this user exists
        const user = await User.findOne({ email });

        // If user does not exists send back an error
        if (!user) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        // Check if password matches with bcrypt(compare)
        const isMatch = await bcrypt.compare(password, user.password);

        // If password is falsy
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid Credentials' });
        }

        // User authenticated
        payload = {
            user: {
                _id: user.id
            }
        }

        // Creating token with payload and secret
        const token = jwt.sign(payload, config.get('JWT_SECRET'), {});

        res.status(200).json({ token })

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Server Error' });
    }

});

// Register
router.post("/register", async (req, res) => {

    // Destructure the body
    const { username, email, password } = req.body;

    try {
        // Check if this user exists
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }

        // bcrypt salts the password
        const hashedPsw = await bcrypt.hash(password, 16);


        // Create a user
        user = new User({
            username,
            email,
            password: hashedPsw,
        });

        // Save the user
        const newUser = await user.save();


        // Send back a token to the frontend, this user was successfully created and is authorized to use the application
        const payload = {
            user: {
                _id: newUser._id,
            },
        };
        // Pass the payload the sign of jwt, then jwt wants a secret
        // require('crypto').randomBytes(36).toString('hex)
        const token = jwt.sign(payload, config.get("JWT_SECRET"), {});

        res.status(201).json({ token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;