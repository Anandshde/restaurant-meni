"use client";

import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dark Brick Background with Overlay */}
      <div className="absolute inset-0 bg-[url('/hero-bg.jpg')] bg-cover bg-center bg-no-repeat" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

      {/* Industrial Light Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Spotlight Effects */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-radial from-amber-400/20 via-amber-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-orange-400/15 via-orange-600/5 to-transparent rounded-full blur-2xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-radial from-amber-500/10 via-yellow-600/5 to-transparent rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Industrial Accent Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-full h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mb-12 max-w-2xl mx-auto"
        />

        {/* Main Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-8"
        >
          <div className="inline-block mb-6 p-3 bg-amber-500/10 backdrop-blur-sm rounded-full border border-amber-500/20">
            <span className="text-4xl sm:text-5xl lg:text-6xl">🍽️</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-white mb-6 leading-none tracking-tight">
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent drop-shadow-2xl">
                АМТ
              </span>
            </span>
            <span className="block mb-2">
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent drop-shadow-2xl">
                УУР АМЬСГАЛ
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-orange-300 via-amber-300 to-orange-300 bg-clip-text text-transparent drop-shadow-2xl">
                СЭТГЭЛ ЗҮРХ
              </span>
            </span>
          </h1>
        </motion.div>

        {/* Industrial Divider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center justify-center mb-12"
        >
          <div className="w-8 h-px bg-amber-400"></div>
          <div className="w-3 h-3 bg-amber-400 rotate-45 mx-4"></div>
          <div className="w-8 h-px bg-amber-400"></div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mb-16"
        >
          <p className="text-xl sm:text-2xl lg:text-3xl max-w-5xl mx-auto leading-relaxed text-gray-100 font-light tracking-wide">
            Манай ресторанд таны амтлах мэдрэмжийг сэргээх,
            <br className="hidden sm:block" />
            <span className="text-amber-300 font-medium">
              халуун дулаан уур амьсгалыг мэдрүүлэх
            </span>
            <br className="hidden sm:block" />
            онцгой зоог таныг хүлээж байна.
          </p>
        </motion.div>

        {/* Modern Industrial Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-8"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xl rounded-none shadow-2xl hover:shadow-amber-500/30 transition-all duration-500 overflow-hidden border-l-4 border-amber-300"
            onClick={() => {
              const menu = document.getElementById("menu-section");
              menu?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3 tracking-wide">
              <span className="text-2xl">🍴</span>
              ХООЛНЫ ЦЭСИЙГ ҮЗЭХ
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-transparent text-white font-bold text-xl rounded-none border-2 border-white/30 hover:border-amber-400 hover:bg-amber-400/10 transition-all duration-500 backdrop-blur-sm"
            onClick={() =>
              window.open(
                "https://www.google.com/maps/place/Your+Restaurant+Location",
                "_blank"
              )
            }
          >
            <span className="flex items-center justify-center gap-3 tracking-wide">
              <span className="text-2xl">📍</span>
              МАНАЙ БАЙРШИЛ
            </span>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </motion.button>
        </motion.div>

        {/* Modern Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-amber-400 text-sm font-medium tracking-widest uppercase">
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-amber-400 to-transparent"
            />
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className="w-2 h-2 bg-amber-400 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
