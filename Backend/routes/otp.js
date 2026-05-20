const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

let otpStore = {};

// SEND OTP
router.post("/send-otp", (req, res) => {
  const { email } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000);
  otpStore[email] = otp;

  console.log("OTP:", otp);

  res.json({ success: true, message: "OTP sent" });
});

// VERIFY OTP
router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (otpStore[email] == otp) {
    res.json({ success: true, message: "OTP verified" });
  } else {
    res.status(400).json({ success: false, message: "Invalid OTP" });
  }
});

// RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  const hashed = await bcrypt.hash(newPassword, 10);

  await User.findOneAndUpdate({ email }, { password: hashed });

  res.json({ success: true, message: "Password updated" });
});

module.exports = router;