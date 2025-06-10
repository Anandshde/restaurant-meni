const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

// 🔐 Admin Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "7d", // 7 хоногийн хугацаатай token
    });

    return res.json({ success: true, token });
  }

  // ❌ Нэвтрэх мэдээлэл буруу
  res.status(401).json({
    success: false,
    error: "Нэвтрэх мэдээлэл буруу байна",
  });
});

module.exports = router;
