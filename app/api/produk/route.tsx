// app/api/products/route.ts

import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { PrismaClient } from "@prisma/client";

// Inisialisasi Prisma Client
const prisma = new PrismaClient();

// Konfigurasi Cloudinary
cloudinary.config({
  cloud_name: "dq1lfiqf0",
  api_key: "516166717369864",
  api_secret: "7DU5U4jETxNJ7kBzhx6ueu05_Hs",
});

// Nonaktifkan bodyParser agar dapat menangani FormData
export const config = {
  api: {
    bodyParser: false,
  },
};

// Fungsi untuk menangani request POST
export async function POST(req: Request) {
  const formData = await req.formData();
  const files = formData.getAll("files") as File[];

  // Ambil data produk dari FormData dengan pengecekan null
  const kodeProduk = formData.get("kodeProduk") as string | null;
  const nama = formData.get("nama") as string | null;
  const brand = formData.get("brand") as string | null;
  const ukuran = formData.get("ukuran") as string | null; // Menganggap ini adalah string JSON
  const warna = formData.get("warna") as string | null; // Menganggap ini adalah string JSON
  const stokString = formData.get("stok") as string | null;
  const hargaJualString = formData.get("hargaJual") as string | null;
  const hargaModalString = formData.get("hargaModal") as string | null;
  const deskripsi = formData.get("deskripsi") as string | null;
  const kategoriIdString = formData.get("kategoriId") as string | null; // Kategori ID sebagai string

  // Mengonversi nilai ke number dengan pengecekan null
  const stok = stokString ? Number(stokString) : 0; // Menggunakan 0 sebagai nilai default
  const hargaJual = hargaJualString ? Number(hargaJualString) : 0; // Menggunakan 0 sebagai nilai default
  const hargaModal = hargaModalString ? Number(hargaModalString) : 0; // Menggunakan 0 sebagai nilai default
  const kategoriId = kategoriIdString ? Number(kategoriIdString) : 0; // Menggunakan 0 jika null

  // Cek apakah ada file yang diunggah
  if (!files.length) {
    return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
  }

  try {
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        // Mengkonversi file menjadi buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Mengupload ke Cloudinary
        const result = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          );
          stream.end(buffer);
        });

        return (result as any).secure_url; // Ambil URL gambar
      })
    );

    // Simpan data produk ke database
    await prisma.produkTb.create({
      data: {
        kodeProduk: kodeProduk || "", // Menggunakan string kosong sebagai default
        nama: nama || "", // Menggunakan string kosong sebagai default
        brand: brand || "", // Menggunakan string kosong sebagai default
        ukuran: ukuran ? JSON.parse(ukuran) : "", // Mengubah kembali dari JSON string ke string kosong
        warna: warna ? JSON.parse(warna) : "", // Mengubah kembali dari JSON string ke string kosong
        stok,
        hargaJual: hargaJual.toString(), // Mengonversi ke string sebelum menyimpan
        hargaModal: hargaModal.toString(), // Mengonversi ke string sebelum menyimpan
        deskripsi: deskripsi || "", // Menggunakan string kosong sebagai default
        kategoriId: kategoriId || 0, // Menggunakan 0 sebagai nilai default jika null
        gambarUrl: uploadedImages.join(", "), // Simpan URL gambar sebagai string (jika lebih dari satu)
      },
    });

    // Mengembalikan data produk yang baru ditambahkan
    return NextResponse.json({ pesan: "sukses" });
  } catch (error) {
    console.error("Error during upload process", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

// Fungsi untuk menangani request GET
export async function GET() {
  const produk = await prisma.produkTb.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      KategoriTb: true,
    },
  });

  return NextResponse.json(produk);
}
