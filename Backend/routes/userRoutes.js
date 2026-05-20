const express = require("express");
const router = express.Router();
const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;

  const exist = await User.findOne({ email });

  if (exist) {
    return res.json({
      success: false,
      message: "User already exists"
    });
  }

  const newUser = new User({ name, email, password, role });
  await newUser.save();

  res.json({
    success: true,
    message: "Signup success",
    role: newUser.role
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ success: false, message: "User not found" });
  }

  if (user.password !== password) {
    return res.json({ success: false, message: "Wrong password" });
  }

  res.json({
    success: true,
    role: user.role
  });
});

module.exports = router;