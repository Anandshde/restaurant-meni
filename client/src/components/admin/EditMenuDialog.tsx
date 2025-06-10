"use client";

import { MenuItem } from "@/types";
import EditMenuForm from "./EditMenuForm";

type Props = {
  menu: MenuItem;
  onClose: () => void;
  onUpdated: () => Promise<void>;
};

export default function EditMenuDialog({ menu, onClose, onUpdated }: Props) {
  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-lg relative">
        <EditMenuForm menu={menu} onClose={onClose} onUpdated={onUpdated} />
        <button
          className="absolute top-2 right-2 bg-gray-200 px-2 py-1 rounded"
          onClick={onClose}
        >
          ❌
        </button>
      </div>
    </div>
  );
}
