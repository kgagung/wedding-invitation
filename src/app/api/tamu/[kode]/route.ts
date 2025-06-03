import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const kode = req.nextUrl.pathname.split("/").pop(); // ambil kode dari URL

  if (!kode) {
    return NextResponse.json(
      { error: "Kode tidak ditemukan" },
      { status: 400 }
    );
  }

  const tamu = await prisma.tamu.findUnique({
    where: { kode },
  });

  if (!tamu) {
    return NextResponse.json(
      { error: "Tamu tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(tamu);
}
