"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";

export default function AddTamuPage() {
  const router = useRouter();
  const [form, setForm] = useState({ nama: "", alamat: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const kode = nanoid(10);

    await fetch("/api/tamu", {
      method: "POST",
      body: JSON.stringify({ ...form, kode }),
    });

    router.push("/admin");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 mt-8">
      <input
        type="text"
        placeholder="Nama"
        value={form.nama}
        onChange={(e) => setForm({ ...form, nama: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Alamat"
        value={form.alamat}
        onChange={(e) => setForm({ ...form, alamat: e.target.value })}
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Simpan Tamu
      </button>
    </form>
  );
}
