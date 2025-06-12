import axios from "axios";

// 📡 API суваг URL-ийг орчны хувьсагчаас уншина
const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

// GET all menu items
export const fetchMenu = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

// POST new menu item (multipart image upload)
export const createMenuItem = async (formData: FormData) => {
  const res = await axios.post(`${API_URL}/menu`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

// UPDATE menu item
export const updateMenuItem = async (id: string, item: any) => {
  const res = await axios.put(`${API_URL}/${id}`, item);
  return res.data;
};

// DELETE menu item

export const deleteMenuItem = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`);
    return res.data; // устгасан объект буюу амжилттай хариу
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "❌ Хоол устгахад алдаа гарлаа"
    );
  }
};
