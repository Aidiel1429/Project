"use client";
import React from "react";
import { IoHome } from "react-icons/io5";
import { AiFillTags } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { FaImages } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname(); // Dapatkan URL path saat ini

  // Fungsi untuk mengecek apakah link aktif
  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-80 h-screen hidden lg:flex lg:flex-col lg:fixed left-0 top-0 p-5 bg-white">
      {" "}
      {/* Sidebar hanya tampil di layar lg ke atas */}
      <div className="h-24 flex justify-center items-center">
        <Link href={"/admin"}>
          <h1 className="text-xl font-bold ">Amifa</h1>
        </Link>
      </div>
      <Link href={"/admin"}>
        <div
          className={`mt-4 rounded-xl ${
            isActive("/admin") ? "bg-[#4318FF] text-white" : ""
          }`}
        >
          <div className="flex items-center gap-3 font-semibold text-md p-3">
            <IoHome className="text-xl" />
            <p>Beranda</p>
          </div>
        </div>
      </Link>
      <Link href={"/admin/produk"}>
        <div
          className={`mt-4 rounded-xl ${
            isActive("/admin/produk") ? "bg-[#4318FF] text-white" : ""
          }`}
        >
          <div className="flex items-center gap-3 font-semibold text-md p-3">
            <AiFillTags className="text-xl" />
            <p>Produk</p>
          </div>
        </div>
      </Link>
      <Link href={"/admin/kategori"}>
        <div
          className={`mt-4 rounded-xl ${
            isActive("/admin/kategori") ? "bg-[#4318FF] text-white" : ""
          }`}
        >
          <div className="flex items-center gap-3 font-semibold text-md p-3">
            <BiSolidCategory className="text-xl" />
            <p>Kategori</p>
          </div>
        </div>
      </Link>
      <Link href={"/admin/member"}>
        <div
          className={`mt-4 rounded-xl ${
            isActive("/admin/member") ? "bg-[#4318FF] text-white" : ""
          }`}
        >
          <div className="flex items-center gap-3 font-semibold text-md p-3">
            <BsPersonFill className="text-xl" />
            <p>Member</p>
          </div>
        </div>
      </Link>
      <Link href={"/admin/corousel"}>
        <div
          className={`mt-4 rounded-xl ${
            isActive("/admin/corousel") ? "bg-[#4318FF] text-white" : ""
          }`}
        >
          <div className="flex items-center gap-3 font-semibold text-md p-3">
            <FaImages className="text-xl" />
            <p>Corousel</p>
          </div>
        </div>
      </Link>
      {/* Flex-grow digunakan untuk menempatkan elemen ke bagian bawah */}
      <div className="mt-auto">
        <div className={`mt-4 rounded-xl`}>
          <div className="flex items-center gap-3 font-semibold text-md p-3 bg-slate-500/15 rounded-xl">
            <IoIosLogOut className="text-xl" />
            <p>Log out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
