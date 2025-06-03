import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const tamu = await prisma.tamu.findMany();
  return NextResponse.json(tamu);
}
