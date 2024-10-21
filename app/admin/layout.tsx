// app/admin/layout.tsx
import React, { useState } from "react";
import Sidebar from "./components/sidebar";
import Header from "./components/header";
import { Poppins } from "next/font/google";
import type { Metadata } from "next";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Dashboard Admin",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased bg-gray-100`}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-grow flex flex-col w-0 lg:ml-80">
            <Header />
            <div className="flex-grow p-5 overflow-auto">{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}

// #4318FF
// #F4F7FE
