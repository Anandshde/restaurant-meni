"use client";
import { deleteMenuItem } from "@/lib/api/menu";
import { MenuItem } from "@/types";
import { toast } from "sonner";

type Props = {
  menus: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onRefresh: () => void; // 👈 энэ мөрийг нэм
};

export default function MenuList({ menus, onEdit, onRefresh }: Props) {
  return (
    <section>
      <h1 className="text-2xl font-bold text-primary mb-4">
        🍽 Хоолны жагсаалт
      </h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {menus.map((menu) => (
          <div
            key={menu._id}
            className="bg-white p-4 rounded-xl shadow border relative group"
          >
            {menu.image && (
              <img
                src={`http://localhost:8000${menu.image}`}
                alt={menu.name}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}

            <h2 className="text-lg font-semibold">{menu.name}</h2>
            <p className="text-sm text-gray-600">{menu.description}</p>
            <p className="text-sm mt-1">💵 {menu.price}₮</p>
            <p className="text-xs text-gray-500">
              📂 {menu.category}{" "}
              {menu.days?.length ? `• ${menu.days.join(", ")}` : ""}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (confirm("Та энэ хоолыг устгахдаа итгэлтэй байна уу?")) {
                  deleteMenuItem(menu._id!)
                    .then(() => {
                      toast.success("🗑️ Амжилттай устгалаа");
                      onRefresh(); // ✅ жагсаалтыг шинэчилнэ
                    })
                    .catch(() => toast.error("❌ Устгах үед алдаа гарлаа"));
                }
              }}
              className="absolute bottom-2 right-2 text-sm text-red-600 bg-white px-2 py-1 rounded shadow hover:bg-red-50 transition"
            >
              🗑️ Устгах
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(menu);
              }}
              className="absolute top-2 right-2 text-sm text-blue-600 bg-white px-2 py-1 rounded shadow hover:bg-blue-50 transition"
            >
              ✏️ Засах
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
