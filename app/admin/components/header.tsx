"use client";
import React, { useState } from "react";
import { GoChevronDown } from "react-icons/go";
import { RiMenu3Line } from "react-icons/ri";
import { IoHome } from "react-icons/io5";
import { AiFillTags } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import { BsPersonFill } from "react-icons/bs";
import { FaImages } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Fungsi untuk mengaktifkan atau menonaktifkan menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Fungsi untuk menutup menu ketika link diklik
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="p-5 hidden lg:flex justify-end items-center w-full mb-2 bg-inherit">
        {" "}
        {/* Background biru */}
        <div className="flex items-center gap-3 cursor-pointer text-white">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Admin"
              />
            </div>
          </div>
          <div className="flex items-center gap-1">
            <p>Admin</p>
          </div>
        </div>
      </div>

      <div className="lg:hidden bg-inherit p-4">
        {" "}
        {/* Background biru */}
        {/* Mobile Menu Button */}
        <div className="p-2 flex justify-between items-center text-white">
          <div className="text-xl font-bold text-slate-700">AMIFA</div>
          <div
            className="text-2xl cursor-pointer text-slate-700"
            onClick={toggleMenu}
          >
            <RiMenu3Line />
          </div>
        </div>
        {/* Sidebar - Full Height and No Gaps */}
        <div
          className={`fixed top-0 left-0 w-[345px] z-50 bg-white h-full text-white p-5 transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } flex flex-col justify-between`}
        >
          <div>
            <div className="flex justify-between items-center text-slate-700">
              <Link href={"/admin"} onClick={closeMenu}>
                <h1 className="text-xl font-bold">AMIFA</h1>
              </Link>
              <div
                className="p-2 hover:bg-white/15 transition-all rounded-lg"
                onClick={closeMenu}
              >
                <MdClose className="text-2xl font-semibold" />
              </div>
            </div>

            <div className="mt-8">
              <Link href={"/admin"} onClick={closeMenu}>
                <div className="flex items-center hover:bg-white/15 transition-all rounded-lg gap-3 font-semibold text-md p-3 mb-2 text-slate-700">
                  <IoHome className="text-xl" />
                  <p>Beranda</p>
                </div>
              </Link>
              <Link href={"/admin/produk"} onClick={closeMenu}>
                <div className="flex items-center hover:bg-white/15 transition-all rounded-lg gap-3 font-semibold text-md p-3 mb-2 text-slate-700">
                  <AiFillTags className="text-xl" />
                  <p>Produk</p>
                </div>
              </Link>
              <Link href={"/admin/kategori"} onClick={closeMenu}>
                <div className="flex items-center hover:bg-white/15 transition-all rounded-lg gap-3 font-semibold text-md p-3 mb-2 text-slate-700">
                  <BiSolidCategory className="text-xl" />
                  <p>Kategori</p>
                </div>
              </Link>
              <Link href={"/admin/member"} onClick={closeMenu}>
                <div className="flex items-center hover:bg-white/15 transition-all rounded-lg gap-3 font-semibold text-md p-3 mb-2 text-slate-700">
                  <BsPersonFill className="text-xl" />
                  <p>Member</p>
                </div>
              </Link>
              <Link href={"/admin/corousel"} onClick={closeMenu}>
                <div className="flex items-center hover:bg-white/15 transition-all rounded-lg gap-3 font-semibold text-md p-3 mb-2">
                  <FaImages className="text-xl" />
                  <p>Corousel</p>
                </div>
              </Link>
            </div>
          </div>

          {/* Element paling bawah */}
          <div className="mt-auto flex justify-between items-center">
            <div className="flex items-center gap-3 text-slate-700">
              <div className="avatar">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                </div>
              </div>
              <p>Admin</p>
            </div>
            <div>
              <h1 className="text-2xl  p-2 bg-white/20 rounded-lg text-slate-700">
                <IoIosLogOut />
              </h1>
            </div>
          </div>
        </div>
        {/* Overlay Gelap */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleMenu} // Klik overlay untuk menutup menu
          ></div>
        )}
      </div>
    </div>
  );
};

export default Header;
