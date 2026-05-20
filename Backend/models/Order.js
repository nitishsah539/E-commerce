const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerName: String,
  phone: String,
  address: String,

  productName: String,
  price: Number,
  qty: Number,

  shopName: String,
  paymentMethod: String,
  paymentStatus: String,

  status: {
    type: String,
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);