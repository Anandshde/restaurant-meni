"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { createMenuItem } from "@/lib/api/menu";

const categories = ["Main", "Lunch", "Drink", "Desserts", "Soup", "Salad"];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type Props = {
  onAdded: () => Promise<void>;
};

export default function AddMenuForm({ onAdded }: Props) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [days, setDays] = useState<string[]>([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      ingredients: "",
      category: "Main",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Хоолны нэр шаардлагатай"),
      price: Yup.number()
        .required("Үнэ оруулна уу")
        .typeError("Үнэ тоо байх ёстой"),
      ingredients: Yup.string(),
      category: Yup.string().required("Ангилал сонгоно уу"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("ingredients", values.ingredients);
      formData.append("category", values.category);
      formData.append("days", JSON.stringify(days)); // ✔️ Days as string
      if (image) formData.append("image", image);

      console.log("📝 Илгээж байна:", {
        ...values,
        days,
      });

      try {
        await createMenuItem(formData);
        await onAdded();
        toast.success("✅ Хоол амжилттай нэмэгдлээ!");
        resetForm();
        setImage(null);
        setPreview(null);
        setDays([]);
      } catch (error) {
        toast.error("❌ Хоол нэмэхэд алдаа гарлаа.");
      }
    },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.form
      onSubmit={formik.handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-xl mx-auto p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow space-y-5"
    >
      <h2 className="text-xl font-semibold text-primary">➕ Шинэ хоол нэмэх</h2>

      <Input
        id="name"
        name="name"
        placeholder="Хоолны нэр"
        value={formik.values.name}
        onChange={formik.handleChange}
      />

      <Input
        id="price"
        name="price"
        type="number"
        placeholder="Үнэ (₮)"
        value={formik.values.price}
        onChange={formik.handleChange}
      />

      <Textarea
        id="ingredients"
        name="ingredients"
        placeholder="Орц (, таслалаар)"
        value={formik.values.ingredients}
        onChange={formik.handleChange}
      />

      <Select
        value={formik.values.category}
        onValueChange={(val) => formik.setFieldValue("category", val)}
      >
        <SelectTrigger className="w-full">
          {formik.values.category || "Ангилал сонгох"}
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Days shown only for Lunch */}
      {formik.values.category === "Lunch" && (
        <div>
          <p className="text-sm mt-2">🔘 Lunch хоолны өдрүүд:</p>
          <div className="flex flex-wrap gap-4 mt-1">
            {weekdays.map((day) => (
              <label key={day} className="flex items-center gap-2">
                <Checkbox
                  checked={days.includes(day)}
                  onCheckedChange={(checked: boolean | "indeterminate") => {
                    if (checked === true) {
                      setDays((prev) => [...prev, day]);
                    } else {
                      setDays((prev) => prev.filter((d) => d !== day));
                    }
                  }}
                />
                <span className="text-sm">{day}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <label htmlFor="foodImage" className="text-sm font-medium">
        Хоолны зураг:
      </label>
      <input
        id="foodImage"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        placeholder="Зураг"
      />

      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="w-24 h-24 object-cover rounded mt-2"
        />
      )}

      <Button type="submit" className="w-full">
        ➕ Нэмэх
      </Button>
    </motion.form>
  );
}
