const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    ingredients: [String],
    image: String, // URL string
    category: {
      type: String,
      enum: ["Lunch", "Main", "Drinks", "Desserts", "Soup", "Salad"],
      required: true,
    },

    days: {
      type: [String],
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MenuItem", menuSchema);
