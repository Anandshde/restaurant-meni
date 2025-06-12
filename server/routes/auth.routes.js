const express = require("express");
const router = express.Router();
require("dotenv").config();

// 🔐 Admin Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    return res.json({ success: true });
  }

  // ❌ Нэвтрэх мэдээлэл буруу
  res.status(401).json({
    success: false,
    error: "Нэвтрэх мэдээлэл буруу байна",
  });
});

module.exports = router;
