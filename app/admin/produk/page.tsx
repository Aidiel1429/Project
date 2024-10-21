"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSearchParams } from "next/navigation";
import { HiPlusSm } from "react-icons/hi";
import { RiCloseLargeFill } from "react-icons/ri";

const Products = () => {
  const [produk, setProduk] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);

  useEffect(() => {
    loadProduk();
  }, []);

  useEffect(() => {
    if (status === "sukses") {
      setAlertMessage("Data Berhasil Ditambahkan!");
      setShowAlert(true);
    } else if (status === "gagal") {
      setAlertMessage("Data Gagal Ditambahkan!");
      setShowAlert(true);
    }

    // Mengatur timeout untuk menghilangkan alert setelah 3 detik
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000);

    // Membersihkan timeout ketika komponen unmount
    return () => clearTimeout(timer);
  }, [status]);

  const loadProduk = async () => {
    try {
      const res = await fetch("/api/produk");
      const data = await res.json();
      setProduk(data);
    } catch (error) {
      console.log(error);
    }
  };

  // datatable
  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = produk.filter(
    (item: any) =>
      (item.nama &&
        item.nama.toLowerCase().includes(filterText.toLowerCase())) ||
      (item.kodeBarang &&
        item.kodeBarang.toLowerCase().includes(filterText.toLowerCase()))
  );

  const columns = [
    {
      name: "No",
      cell: (row: any, index: number) => (
        <div>{(currentPage - 1) * itemsPerPage + index + 1}</div>
      ),
      sortable: false,
      width: "80px",
    },
    {
      name: "Nama Barang",
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: "Kategori",
      selector: (row: any) => row.KategoriTb?.nama,
      sortable: true,
    },
    {
      name: "Brand",
      selector: (row: any) => row.brand,
      sortable: true,
    },
    {
      name: "Ukuran",
      selector: (row: any) => row.ukuran,
      sortable: true,
    },
    {
      name: "Warna",
      selector: (row: any) => row.warna,
      sortable: true,
    },
    {
      name: "Stok",
      selector: (row: any) => row.stok,
      sortable: true,
    },
    {
      name: "Harga Modal",
      selector: (row: any) =>
        "Rp " +
        new Intl.NumberFormat("id-ID", {
          style: "decimal",
          minimumFractionDigits: 0,
        }).format(row.hargaModal),
      sortable: true,
    },
    {
      name: "Harga Jual",
      selector: (row: any) =>
        "Rp " +
        new Intl.NumberFormat("id-ID", {
          style: "decimal",
          minimumFractionDigits: 0,
        }).format(row.hargaJual),
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="flex gap-2 items-center">
          {/* <Hapus
            id={row.id}
            loadProduk={loadProduk}
            setAlert={setAlert}
            setAlertError={setAlertError}
          /> */}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="font-bold md:text-xl">Produk</h1>
            <p className="text-xs md:text-sm">
              Tambah produk yang akan dijual.
            </p>
          </div>
          <div>
            <Link href="/admin/produk/action/Tambah">
              <button className="btn btn-primary text-white">
                Tambah <HiPlusSm className="ml-2 text-2xl hidden sm:block" />
              </button>
            </Link>
          </div>
        </div>
        {showAlert && (
          <div
            role="alert"
            className={`alert ${
              status === "sukses" ? "alert-success" : "alert-error"
            } flex text-sm`}
          >
            <div className="flex items-center gap-2 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{alertMessage}</span>
            </div>
          </div>
        )}
        <div>
          {alert && (
            <div
              role="alert"
              className="alert alert-success mb-2 text-white flex justify-between"
            >
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Data Berhasil Dihapus!</span>
              </div>
              <span
                onClick={() => setAlert(false)}
                className="hover:bg-white/15 p-2 rounded-lg cursor-pointer transition-all"
              >
                <RiCloseLargeFill />
              </span>
            </div>
          )}

          {alertError && (
            <div
              role="alert"
              className="alert alert-error mb-2 text-white flex justify-between"
            >
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>Data Gagal Dihapus!</span>
              </div>
              <span
                onClick={() => setAlertError(false)}
                className="hover:bg-white/15 p-2 rounded-lg cursor-pointer transition-all"
              >
                <RiCloseLargeFill />
              </span>
            </div>
          )}
          <DataTable
            columns={columns}
            data={filteredItems}
            pagination
            persistTableHead
            responsive
            paginationPerPage={itemsPerPage}
            paginationTotalRows={filteredItems.length}
            onChangePage={(page) => setCurrentPage(page)}
            onChangeRowsPerPage={handleRowsPerPageChange}
            paginationRowsPerPageOptions={[5, 10, 20]}
            customStyles={{
              tableWrapper: {
                style: {
                  overflowX: "auto",
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Products;
