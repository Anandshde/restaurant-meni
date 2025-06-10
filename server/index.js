const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const PORT = process.env.PORT || 8000;

dotenv.config(); // .env уншина

const app = express();

app.use(
  cors({
    origin: "https://restaurant-meni.vercel.app", // Frontend домэйн
    credentials: true,
  })
);
// 🛡️ Middleware

app.use(express.json());

// 📁 Static image folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 🚀 Server start
app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
