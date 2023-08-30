const express = require("express");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const router = express.Router();

// Example secret key (replace with your actual secret key)
const SECRET_KEY = process.env.SECRET_KEY

// Verify token logic using jwt.verify
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }

    req.user = decoded; // Attach decoded data to the request
    next();
  });
};

router.get("/", verifyToken, (req, res) => {
  // Protected route logic
  res.json({ message: "Protected route accessed", user: req.user });
});

module.exports = router;
