const express = require("express");
const router = express.Router();
const upload = require("../middlewares/multer"); // ✔️ Memory-based
const cloudinary = require("../config/cloudinary.config"); // ✔️ Cloudinary config
const MenuItem = require("../models/menu.model");
const verifyToken = require("../middlewares/verifyToken");
const streamifier = require("streamifier");

/**
 * ✅ GET - бүх хоол
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
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { name, price, ingredients, category, days } = req.body;

    let parsedDays = [];
    if (Array.isArray(days)) {
      parsedDays = days;
    } else if (typeof days === "string") {
      try {
        parsedDays = JSON.parse(days);
      } catch {
        parsedDays = [days];
      }
    }

    let imageUrl;
    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "restaurant-menu" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      imageUrl = result.secure_url;
    }

    const newItem = new MenuItem({
      name,
      price,
      ingredients: ingredients
        ? ingredients.split(",").map((i) => i.trim())
        : [],
      category,
      days: parsedDays,
      image: imageUrl,
    });

    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("❌ POST алдаа:", err);
    res.status(400).json({ error: "Хоол нэмэхэд алдаа гарлаа", details: err });
  }
});

/**
 * ✅ PUT - хоол шинэчлэх
 */
router.put("/:id", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;

    if (req.file) {
      const streamUpload = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: "restaurant-menu" },
            (error, result) => {
              if (result) resolve(result);
              else reject(error);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const result = await streamUpload();
      update.image = result.secure_url;
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
 * ✅ DELETE - хоол устгах
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
