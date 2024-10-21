"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    loadProduk();
  }, []);

  const loadProduk = async () => {
    try {
      const res = await axios.get("/api/uploads");
      const data = res.data;
      setProduk(data);
    } catch (error) {
      console.log("Gagal");
    }
  };
  return (
    <div className="p-10">
      <h1>User Panel</h1>
      {produk.map((item: any) => (
        <div>
          <h1 className="text-black">{item.nama}</h1>
          <img src={item.gambarUrl} alt="" />
        </div>
      ))}
    </div>
  );
}
