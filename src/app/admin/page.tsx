import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const tamu: {
    id: number;
    nama: string;
    alamat: string;
    hadir: boolean;
    kode: string;
  }[] = await prisma.tamu.findMany();

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Daftar Tamu</h1>
      <Link href="/admin/add" className="text-blue-600 mb-4 block">
        + Tambah Tamu
      </Link>
      <a href="/admin/export" className="text-green-600 block mb-4">
        📤 Export ke Excel
      </a>

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
          {tamu.map(
            (t: {
              id: number;
              nama: string;
              alamat: string;
              hadir: boolean;
              kode: string;
            }) => (
              <tr key={t.id}>
                <td>{t.nama}</td>
                <td>{t.alamat}</td>
                <td>{t.hadir ? "✅" : "❌"}</td>
                <td>{t.kode}</td>
                <td>
                  <a
                    href={`/${t.kode}`}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Buka Undangan
                  </a>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}
