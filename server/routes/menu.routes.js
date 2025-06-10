const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const MenuItem = require("../models/menu.model");

// 🖼️ Зураг хадгалах тохиргоо
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });
const verifyToken = require("../middlewares/verifyToken");

/**
 * ✅ GET - бүх хоолыг авах
 */
router.get("/", async (req, res) => {
  try {
    const items = await MenuItem.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: "Алдаа гарлаа", error: err });
  }
});

/**
 * ✅ POST - шинэ хоол нэмэх
 */
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const { name, price, ingredients, category, days } = req.body;

    console.log("✅ POST ирсэн өгөгдөл:", req.body);

    // 🛠️ days-г боловсруулна
    let parsedDays = [];

    if (Array.isArray(days)) {
      parsedDays = days;
      console.log("📦 days нь массив хэлбэртэй:", parsedDays);
    } else if (typeof days === "string") {
      try {
        parsedDays = JSON.parse(days);
        console.log("📦 days parse хийсэн:", parsedDays);
      } catch (e) {
        parsedDays = [days]; // ганц утга байсан ч хадгалах
        console.warn("⚠️ days parse амжилтгүй, ганц утга:", parsedDays);
      }
    }

    const newItem = new MenuItem({
      name,
      price,
      ingredients: ingredients
        ? ingredients.split(",").map((i) => i.trim())
        : [],
      category,
      days: parsedDays,
      image: req.file ? `/uploads/${req.file.filename}` : undefined,
    });

    console.log("💾 MongoDB-д хадгалах:", newItem);

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ POST алдаа:", err);
    res.status(400).json({ error: "Хоол нэмэхэд алдаа гарлаа", details: err });
  }
});

/**
 * ✅ PUT - update хийх
 */
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updated = await MenuItem.findByIdAndUpdate(id, update, { new: true });

    if (!updated) {
      return res.status(404).json({ message: "Хоол олдсонгүй" });
    }

    res.json(updated);
  } catch (err) {
    console.error("❌ PUT алдаа:", err);
    res.status(500).json({ message: "Серверийн алдаа", error: err });
  }
});
// ❌ Устгах API
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MenuItem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Хоол олдсонгүй" });
    }
    res.json({ message: "Хоол амжилттай устгагдлаа" });
  } catch (err) {
    console.error("❌ DELETE алдаа:", err);
    res.status(500).json({ message: "Серверийн алдаа", error: err });
  }
});
// ✅ DELETE - хоол устгах
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MenuItem.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Хоол олдсонгүй" });
    }
    res.json({ message: "Амжилттай устгалаа", deleted });
  } catch (err) {
    res.status(500).json({ message: "Серверийн алдаа", error: err });
  }
});

module.exports = router;
