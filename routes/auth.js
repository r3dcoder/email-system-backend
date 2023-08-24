const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../db/users");

const router = express.Router();

router.post("/signup", async (req, res) => {

    try {
        const { email, password } = req.body;

        // Check if the user already exists
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(409).json({ error: "User already exists" });
        }

        // Hash the password before saving to the database
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = { email, password: hashedPassword };

        // Create a new user
        await createUser(user);

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
});

router.post("/signin", async (req, res) => {

    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: "Authentication failed" });
        }

        // Generate a JWT token
        const token = jwt.sign({ email: user.email }, "your-secret-key", { expiresIn: "1h" });

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: "Authentication failed" });
    }

});

module.exports = router;
