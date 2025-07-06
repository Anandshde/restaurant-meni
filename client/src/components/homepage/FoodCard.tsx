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
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 cursor-pointer transition-all duration-300 overflow-hidden backdrop-blur-sm"
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden">
        <img
          src={item.image || "/fallback.png"}
          alt={item.name}
          className="w-full h-48 sm:h-52 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Price Badge */}
        <div className="absolute top-3 right-3 bg-amber-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
          ₮ {item.price.toLocaleString()}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        {/* Name */}
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors duration-200">
          {item.name}
        </h3>

        {/* Ingredients */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
          {Array.isArray(item.ingredients)
            ? item.ingredients.join(", ")
            : item.ingredients}
        </p>

        {/* Action Indicator */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">
            Click to view details
          </span>
          <div className="w-6 h-6 rounded-full bg-amber-100 flex items-center justify-center group-hover:bg-amber-200 transition-colors duration-200">
            <svg
              className="w-3 h-3 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
