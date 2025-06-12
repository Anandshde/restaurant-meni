const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const PORT = process.env.PORT || 8000;

dotenv.config(); // .env файлыг ачаална

const app = express();

// ✅ CORS зөв тохиргоо (илүү flexible болгоно)
app.use(cors());

// 🛡️ Middleware
app.use(express.json());

// 📁 Cloudinary зурагны URL ашиглах тул локал статик фолдер шаардлагагүй

// 📦 Routes
const menuRoutes = require("./routes/menu.routes");
const authRoutes = require("./routes/auth.routes");

app.use("/api/menu", menuRoutes);
app.use("/api/auth", authRoutes);

// ✅ Health check
app.get("/", (req, res) => {
  res.send("🍽️ Server is running!");
});

// 🌐 MongoDB холболт
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🚀 Server start
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
