
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");
const otpRoutes = require("./routes/otp"); 
const orderRoutes = require("./routes/order");
const notificationRoutes = require("./routes/notification");


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// static folder (image upload)
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);     
app.use("/api/otp", otpRoutes);      
app.use("/api/orders", orderRoutes);
app.use("/api/order", require("./routes/order"));
app.use("/api/notification", notificationRoutes);

// DB connect
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("DB Connected"))
.catch(err => console.log(err));

// server
app.listen(5000, () => console.log("Server running on 5000"));