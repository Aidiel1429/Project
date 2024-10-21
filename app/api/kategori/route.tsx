import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const formData = await request.formData();
  await prisma.kategoriTb.create({
    data: {
      nama: String(formData.get("nama")),
    },
  });

  return NextResponse.json({ pesan: "sukses" });
}

export async function GET() {
  const kategori = await prisma.kategoriTb.findMany({
    orderBy: {
      id: "asc",
    },
  });

  return NextResponse.json(kategori, {
    status: 200,
  });
}
