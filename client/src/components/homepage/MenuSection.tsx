"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/types";

type Props = {
  title: string;
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
  titleColor?: string;
};

export default function MenuSection({
  title,
  items,
  onSelect,
  titleColor = "text-yellow-500", // default highlight
}: Props) {
  return (
    <section className="mb-16">
      <h2 className={`text-3xl font-bold px-6 mb-6 ${titleColor}`}>{title}</h2>

      {items.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 pb-12"
        >
          {items.map((item) => (
            <motion.div
              key={item._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onSelect(item)}
              className="bg-gradient-to-br from-amber-50 to-yellow-100 text-zinc-800 p-5 rounded-2xl shadow-xl border border-yellow-200 cursor-pointer transition-all duration-300"
            >
              <img
                src={item.image || "/fallback.png"}
                alt={item.name}
                className="w-full h-44 object-cover rounded-xl mb-4 shadow"
              />

              <h3 className="text-xl font-semibold mb-1">{item.name}</h3>

              <p className="text-sm text-zinc-600 mb-2 truncate">
                {Array.isArray(item.ingredients)
                  ? item.ingredients.join(", ")
                  : item.ingredients}
              </p>

              <p className="text-yellow-700 text-lg font-bold">
                ₮ {item.price.toLocaleString()}
              </p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <p className="text-center text-muted-foreground">No items available.</p>
      )}
    </section>
  );
}
