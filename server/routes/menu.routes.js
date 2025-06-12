const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const MenuItem = require("../models/menu.model");
const verifyToken = require("../middlewares/verifyToken");

// 🖼️ Cloudinary тохиргоо
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png", "gif"],
  },
});
const upload = multer({ storage });

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
 * ✅ POST - шинэ хоол нэмэх (token хамгаалалттай)
 */
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, price, ingredients, category, days } = req.body;
    console.log("✅ POST ирсэн өгөгдөл:", req.body);

    // 🛠️ days-г боловсруулна
    let parsedDays = [];
    if (Array.isArray(days)) {
      parsedDays = days;
    } else if (typeof days === "string") {
      try {
        parsedDays = JSON.parse(days);
      } catch (e) {
        parsedDays = [days];
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
      image: req.file ? req.file.path : undefined,
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ POST алдаа:", err);
    res.status(400).json({ error: "Хоол нэмэхэд алдаа гарлаа", details: err });
  }
});

/**
 * ✅ PUT - хоол шинэчлэх (зураг шинэчлэх боломжтой)
 */
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (req.file) {
      update.image = req.file.path;
    }

    const updated = await MenuItem.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return res.status(404).json({ message: "Хоол олдсонгүй" });

    res.json(updated);
  } catch (err) {
    console.error("❌ PUT алдаа:", err);
    res.status(500).json({ message: "Серверийн алдаа", error: err });
  }
});

/**
 * ✅ DELETE - хоол устгах (token шаардлагатай)
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MenuItem.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Хоол олдсонгүй" });

    res.json({ message: "Амжилттай устгалаа", deleted });
  } catch (err) {
    console.error("❌ DELETE алдаа:", err);
    res.status(500).json({ message: "Серверийн алдаа", error: err });
  }
});

module.exports = router;
