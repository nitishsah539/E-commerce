const mongoose= require("mongoose");
const schema = new mongoose.Schema({
  name: String,
  price: Number,
  weight: String,
  image: String,
  shopName: String  
});

module.exports = mongoose.model("Product", schema);