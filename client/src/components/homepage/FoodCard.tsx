"use client";

import { MenuItem } from "@/types";
import { motion } from "framer-motion";

type Props = {
  item: MenuItem;
  onClick: () => void;
};

export default function FoodCard({ item, onClick }: Props) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className="bg-gradient-to-br from-amber-50 to-yellow-100 text-zinc-800 p-5 rounded-2xl shadow-xl border border-amber-200 cursor-pointer transition-all duration-300"
    >
      {/* 🖼 Image */}
      <img
        src={
          item.image ? `http://localhost:8000${item.image}` : "/fallback.png"
        }
        alt={item.name}
        className="w-full h-44 object-cover rounded-xl mb-4 shadow-sm"
      />

      {/* 📝 Name */}
      <h3 className="text-xl font-bold mb-1 tracking-tight">{item.name}</h3>

      {/* 🧂 Ingredients */}
      <p className="text-sm text-zinc-700 mb-3 leading-tight line-clamp-2">
        {Array.isArray(item.ingredients)
          ? item.ingredients.join(", ")
          : item.ingredients}
      </p>

      {/* 💸 Price */}
      <p className="text-yellow-600 text-lg font-bold">
        ₮ {item.price.toLocaleString()}
      </p>
    </motion.div>
  );
}
