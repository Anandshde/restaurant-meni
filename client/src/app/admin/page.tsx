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
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login"); // 👈 Хэрвээ token байхгүй бол буцаана
    } else {
      loadMenus();
    }
  }, []);

  return (
    <main className="p-6 space-y-8 bg-secondary min-h-screen">
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
