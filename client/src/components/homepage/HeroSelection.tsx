"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="relative w-full h-[80vh] sm:h-[90vh] flex items-center justify-center text-white text-center"
    >
      {/* 🔳 Background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-black/60" />

      {/* 📝 Title, Description, Buttons */}
      <div className="relative z-10 px-6 space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-xl">
          🍽️ Амт, уур амьсгал, сэтгэл зүрх
        </h1>

        <p className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed text-gray-200">
          Манай ресторанд таны амтлах мэдрэмжийг сэргээх, халуун дулаан уур
          амьсгалыг мэдрүүлэх онцгой зоог таныг хүлээж байна.
        </p>

        <div className="flex justify-center gap-4 flex-wrap mt-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition"
            onClick={() => {
              const menu = document.getElementById("menu-section");
              menu?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            🍴 Хоолны цэсийг үзэх
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-100 transition"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Your+Restaurant+Location",
                "_blank"
              )
            }
          >
            📍 Манай байршил
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
}
