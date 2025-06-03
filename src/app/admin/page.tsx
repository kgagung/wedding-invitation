"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

type Tamu = {
  id: number;
  nama: string;
  alamat: string;
  hadir: boolean;
  kode: string;
};

export default function AdminPage() {
  const [tamu, setTamu] = useState<Tamu[]>([]);

  useEffect(() => {
    fetch("/api/tamu")
      .then((res) => res.json())
      .then(setTamu);
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Tamu</h1>
      <Link href="/admin/add" className="text-blue-600 mb-4 block">
        + Tambah Tamu
      </Link>
      <Link href="/admin/export" className="text-green-600 block mb-4">
        📤 Export ke Excel
      </Link>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Nama</th>
            <th>Alamat</th>
            <th>Hadir</th>
            <th>Kode</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>
          {tamu.map((t) => (
            <tr key={t.id}>
              <td className="text-center">{t.nama}</td>
              <td className="text-center">{t.alamat}</td>
              <td className="text-center">{t.hadir ? "✅" : "❌"}</td>
              <td className="text-center">{t.kode}</td>
              <td className="text-center">
                <a
                  href={`/${t.kode}`}
                  target="_blank"
                  className="text-blue-500 underline"
                >
                  Buka Undangan
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
