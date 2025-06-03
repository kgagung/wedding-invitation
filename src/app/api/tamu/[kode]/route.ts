import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // atau "@/lib/prisma" jika sesuai

// GET: /api/tamu/[kode]
export async function GET(req: Request, context: { params: { kode: string } }) {
  const { kode } = context.params;

  const tamu = await prisma.tamu.findUnique({
    where: { kode },
  });

  if (!tamu) {
    return NextResponse.json({ error: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(tamu);
}
