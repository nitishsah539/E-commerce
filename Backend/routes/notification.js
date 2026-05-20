const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Notification = require("../models/Notification");
router.post("/create", async (req, res) => {
  try {

    const order = new Order(req.body);
    await order.save();

    await Notification.create({
      message: `New order received for ${req.body.productName}`,
      shopName: req.body.shopName
    });

    res.json({
      success: true,
      message: "Order placed"
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
router.get("/notifications/:shopName", async (req, res) => {
  try {

    const data = await Notification.find({
      shopName: req.params.shopName
    }).sort({ createdAt: -1 });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;