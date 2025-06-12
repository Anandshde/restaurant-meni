"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddMenu from "@/components/admin/AddMenuForm";
import EditMenuDialog from "@/components/admin/EditMenuDialog";
import MenuList from "@/components/admin/MenuList";
import { fetchMenu } from "@/lib/api/menu";
import { MenuItem } from "@/types";

export default function AdminPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [selectedEdit, setSelectedEdit] = useState<MenuItem | null>(null);
  const router = useRouter();

  const loadMenus = async () => {
    const data = await fetchMenu();
    setMenus(data);
  };

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedIn");
    if (!loggedIn) {
      router.push("/admin/login"); // 👈 Хэрвээ нэвтрээгүй бол буцаана
    } else {
      loadMenus();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    router.push("/admin/login");
  };

  return (
    <main className="p-6 space-y-8 bg-secondary min-h-screen">
      <button
        onClick={handleLogout}
        className="mb-4 bg-red-500 text-white py-1 px-3 rounded"
      >
        Гарах
      </button>
      <MenuList
        menus={menus}
        onEdit={(item) => setSelectedEdit(item)}
        onRefresh={loadMenus}
      />

      <AddMenu onAdded={loadMenus} />

      {selectedEdit && (
        <EditMenuDialog
          menu={selectedEdit}
          onClose={() => setSelectedEdit(null)}
          onUpdated={loadMenus}
        />
      )}
    </main>
  );
}
