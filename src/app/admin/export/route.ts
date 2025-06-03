import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import ExcelJS from "exceljs";

export async function GET() {
  const tamu = await prisma.tamu.findMany();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Daftar Tamu");

  sheet.columns = [
    { header: "Nama", key: "nama" },
    { header: "Alamat", key: "alamat" },
    { header: "Kode", key: "kode" },
    { header: "Hadir", key: "hadir" },
    { header: "Pesan", key: "pesan" },
  ];

  tamu.forEach((t) => {
    sheet.addRow({
      nama: t.nama,
      alamat: t.alamat,
      kode: t.kode,
      hadir: t.hadir ? "Ya" : "Tidak",
      pesan: t.pesan ?? "",
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": "attachment; filename=daftar_tamu.xlsx",
    },
  });
}
