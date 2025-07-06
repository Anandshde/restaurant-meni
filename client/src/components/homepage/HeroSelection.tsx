"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background with Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-900/90 via-orange-900/80 to-red-900/90" />
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-30" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-amber-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block text-amber-300 text-3xl sm:text-4xl lg:text-5xl mb-2">
              🍽️
            </span>
            <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent">
              Амт, уур амьсгал,
            </span>
            <br />
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-amber-300 bg-clip-text text-transparent">
              сэтгэл зүрх
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed text-gray-100 font-light">
            Манай ресторанд таны амтлах мэдрэмжийг сэргээх, халуун дулаан уур
            амьсгалыг мэдрүүлэх онцгой зоог таныг хүлээж байна.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-400 to-amber-500 text-black font-bold text-lg rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 overflow-hidden"
            onClick={() => {
              const menu = document.getElementById("menu-section");
              menu?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              🍴 Хоолны цэсийг үзэх
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-lg rounded-full border-2 border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Your+Restaurant+Location",
                "_blank"
              )
            }
          >
            <span className="flex items-center justify-center gap-2">
              📍 Манай байршил
            </span>
          </motion.button>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
