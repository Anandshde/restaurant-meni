"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );
      if (res.data.success) {
        localStorage.setItem("loggedIn", "true");
        router.push("/admin");
      }
    } catch (err) {
      alert("Нэвтрэх нэр эсвэл нууц үг буруу байна... дахин оролдоно уу.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md space-y-4 w-full max-w-sm">
        <h2 className="text-xl font-bold text-center">Админ нэвтрэх</h2>
        <input
          type="email"
          className="w-full border p-2 rounded"
          placeholder="И-мэйл"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 rounded"
          placeholder="Нууц үг"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-yellow-400 text-black font-semibold py-2 rounded hover:bg-yellow-300"
        >
          Нэвтрэх
        </button>
      </div>
    </div>
  );
}
