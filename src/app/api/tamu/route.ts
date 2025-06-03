import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const body = await req.json();
  const { nama, alamat, kode } = body;

  await prisma.tamu.create({
    data: {
      nama,
      alamat,
      kode,
    },
  });

  return NextResponse.json({ status: "ok" });
}
