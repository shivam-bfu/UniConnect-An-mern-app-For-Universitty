const express = require("express");
const route = express.Router();
const jwt = require("jsonwebtoken");
const multer = require("multer");
const userModel = require("../models/UserModel");
const postModel = require("../models/PostModel");

// Multer storage for image upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.get("/", async (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.status(401).json({ error: "Unauthorized" });
  
      const decoded = jwt.verify(token, "secret-key");
      const user = await userModel.findOne({ email: decoded.email }).populate("post");
  
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.json({
        status: 200,
        posts: user.post || [],
      });
    } catch (err) {
      res.status(400).json({ error: "Invalid token or user not found" });
    }
  });


  route.get("/all", async (req, res) => {
    try {
      const posts = await postModel.find();
      
      if (!posts || posts.length === 0) {
        return res.status(404).json({ message: "No posts found" });
      }
  
      res.status(200).json({ success: true, data: posts });
    } catch (error) {
      console.error("Error fetching posts:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  });

// ✅ Write a new post with an image
route.post("/writePost", upload.single("image"), async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, "secret-key");
    const user = await userModel.findOne({ email: decoded.email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const imageBuffer = req.file ? req.file.buffer.toString("base64") : null;

    const createdPost = await postModel.create({
      post: req.body.post,
      user: user._id,
      image: imageBuffer,
    });

    user.post.push(createdPost._id);
    await user.save();

    res.json({ status: 200, post: createdPost });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
});

module.exports = route;
