const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Product = require('../models/product')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },

  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// GET PRODUCTS
router.get("/products", async (req, res) => {

  try {

    const data = await Product.find();
    res.json(data);

  } catch (err) {

    console.log("GET ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// ADD PRODUCT
router.post("/add-product", upload.single("image"), async (req, res) => {

  try {

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (!req.body.name || !req.body.price) {
      return res.status(400).json({
        message: "Name & Price required"
      });
    }

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      weight: req.body.weight,
      image: req.file ? req.file.filename : "",
      shopName: req.body.shopName
    });

    await newProduct.save();

    res.json({
      message: "Product added successfully",
      product: newProduct
    });

  } catch (err) {

    console.log("ADD ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

// DELETE PRODUCT + IMAGE
router.delete("/product/:id", async (req, res) => {

  try {

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    // image path
    const imagePath = path.join(
      __dirname,
      "../uploads",
      product.image
    );

    // delete image file
    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // delete product from mongodb
    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (err) {

    console.log("DELETE ERROR:", err);

    res.status(500).json({
      error: err.message
    });
  }
});

module.exports = router;