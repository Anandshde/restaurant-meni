import axios from "axios";

const API_URL = `https://restaurant-meni-1.onrender.com/api`;

// 🔑 Token авна
const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// GET all menu items (public)
export const fetchMenu = async () => {
  const res = await axios.get(`${API_URL}/menu`);
  return res.data;
};

// POST new menu item (protected)
export const createMenuItem = async (formData: FormData) => {
  const res = await axios.post(`${API_URL}/menu`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      ...getAuthHeader(),
    },
  });
  return res.data;
};

// UPDATE menu item (protected)
export const updateMenuItem = async (id: string, item: any) => {
  const res = await axios.put(`${API_URL}/menu/${id}`, item, {
    headers: getAuthHeader(),
  });
  return res.data;
};

// DELETE menu item (protected)
export const deleteMenuItem = async (id: string) => {
  try {
    const res = await axios.delete(`${API_URL}/menu/${id}`, {
      headers: getAuthHeader(),
    });
    return res.data;
  } catch (err: any) {
    throw new Error(
      err.response?.data?.message || "❌ Хоол устгахад алдаа гарлаа"
    );
  }
};
