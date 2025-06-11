const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

const PORT = process.env.PORT || 8000;

dotenv.config(); // .env файлыг ачаална

const app = express();

// ✅ CORS зөв тохиргоо (илүү flexible болгоно)
const allowedOrigins = [
  "https://restaurant-meni.vercel.app",
  "https://restaurant-meni-git-main-anands-projects-8ded01fc.vercel.app", // Vercel preview
  "http://localhost:3000", // Local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`❌ CORS block: ${origin}`);
        callback(new Error("CORS policy: Not allowed"));
      }
    },
    credentials: true,
  })
);

// 🛡️ Middleware
app.use(express.json());

// 📁 Статик зурагны фолдер
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
