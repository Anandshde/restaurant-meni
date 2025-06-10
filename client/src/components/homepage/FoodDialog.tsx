"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MenuItem } from "@/types";

type Props = {
  food: MenuItem | null;
  onClose: () => void;
};

export default function FoodDialog({ food, onClose }: Props) {
  return (
    <Dialog open={!!food} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl text-white">
        {food && (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-yellow-400">
                {food.name}
              </DialogTitle>
            </DialogHeader>

            <img
              src={
                food.image
                  ? `http://localhost:8000${food.image}`
                  : "/fallback.png"
              }
              alt={food.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />

            <p className="text-white/80 text-sm mb-2">
              🧂 Орц:{" "}
              {Array.isArray(food.ingredients)
                ? food.ingredients.join(", ")
                : food.ingredients}
            </p>

            <p className="text-lg font-semibold text-yellow-400">
              ₮ {food.price}
            </p>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
