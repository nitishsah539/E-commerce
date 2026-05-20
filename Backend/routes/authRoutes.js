const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role, shopName } = req.body;

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      shopName: role === "shopkeeper" ? shopName : "" 
    });

    await newUser.save();

    res.json({
      success: true,
      message: "Signup success",
      role: newUser.role
    });
    

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      "SECRET_KEY",
      { expiresIn: "1d" }
    );
 res.json({
  success: true,
  token,
  role: user.role,
  name: user.name,
  email: user.email,
  shopName: user.shopName
});

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


router.get("/shops", async (req, res) => {
  try {
    const shops = await User
      .find({ role: "shopkeeper" })
      .select("shopName"); 

    res.json(shops);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;