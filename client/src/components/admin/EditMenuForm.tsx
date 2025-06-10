"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
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
import { MenuItem } from "@/types";
import { updateMenuItem } from "@/lib/api/menu";
import { toast } from "sonner";
import { useState } from "react";

const categories = ["Main", "Lunch", "Drink"];
const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

type Props = {
  menu: MenuItem;
  onClose?: () => void;
  onUpdated: () => Promise<void>;
};

export default function EditMenuForm({ menu, onClose, onUpdated }: Props) {
  const [days, setDays] = useState<string[]>(menu.days || []);

  const formik = useFormik({
    initialValues: {
      name: menu.name,
      description: menu.description || "",
      price: menu.price,
      ingredients: Array.isArray(menu.ingredients)
        ? menu.ingredients.join(", ")
        : menu.ingredients || "",
      category: menu.category,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      price: Yup.number().required("Required"),
      ingredients: Yup.string(),
      category: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const updated = {
          ...values,
          ingredients: values.ingredients.split(",").map((i) => i.trim()),
          days,
        };
        await updateMenuItem(menu._id, updated);
        toast.success("✅ Амжилттай шинэчлэгдлээ!");
        await onUpdated();
        if (onClose) onClose();
      } catch (err) {
        toast.error("❌ Шинэчлэхэд алдаа гарлаа!");
        console.error(err);
      }
    },
  });

  const handleCheckboxChange = (day: string) => {
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <Input
        name="name"
        placeholder="Нэр"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <Textarea
        name="description"
        placeholder="Тайлбар"
        value={formik.values.description}
        onChange={formik.handleChange}
      />
      <Input
        name="price"
        type="number"
        placeholder="Үнэ"
        value={formik.values.price}
        onChange={formik.handleChange}
      />
      <Select
        value={formik.values.category}
        onValueChange={(val) => formik.setFieldValue("category", val)}
      >
        <SelectTrigger>
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

      {formik.values.category === "Lunch" && (
        <div className="flex gap-2 flex-wrap">
          {weekdays.map((day) => (
            <label key={day} className="flex gap-1 items-center">
              <Checkbox
                checked={days.includes(day)}
                onCheckedChange={() => handleCheckboxChange(day)}
              />
              {day}
            </label>
          ))}
        </div>
      )}

      <Button type="submit" className="w-full">
        Хадгалах
      </Button>
    </form>
  );
}
