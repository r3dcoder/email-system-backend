const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

const verifyToken = (req, res, next) => {
  // Verify token logic using jwt.verify
};

router.get("/", verifyToken, (req, res) => {
  // Protected route logic
});

module.exports = router;
