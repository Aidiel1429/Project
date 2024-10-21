"use client";
import LoadingButton from "@/app/loadingButton";
import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { AiOutlineClose } from "react-icons/ai";

const Kategori = () => {
  const [kategori, setKategori] = useState([]);
  const [nama, setNama] = useState("");
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [alert, setAlert] = useState({ show: false, type: "", message: "" });
  const [alertHapus, setAlertHapus] = useState(false);
  const [alertEdit, setAlertEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadKategori();
  }, []);

  const loadKategori = async () => {
    try {
      const res = await axios.get("/api/kategori");
      const data = res.data;
      setKategori(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    if (!nama) {
      setAlert({
        show: true,
        type: "error",
        message: "Nama kategori harus diisi",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nama", nama);
      const res = await axios.post("/api/kategori", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "sukses") {
        setAlert({
          show: true,
          type: "success",
          message: "Berhasil menambahkan kategori!",
        });
        loadKategori();
        setNama("");
      } else {
        setAlert({
          show: true,
          type: "error",
          message: "Gagal menambah kategori",
        });
      }
    } catch (error) {
      setAlert({
        show: true,
        type: "error",
        message: "Terjadi kesalahan saat menghubungi server",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowsPerPageChange = (newPerPage: number, page: number) => {
    setItemsPerPage(newPerPage);
    setCurrentPage(page);
  };

  const filteredItems = kategori.filter(
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
      name: "Nama Kategori",
      selector: (row: any) => row.nama,
      sortable: true,
    },
    {
      name: "Aksi",
      cell: (row: any) => (
        <div className="flex gap-2 items-center">
          {/* <Hapus
            id={row.id}
            loadKategori={loadKategori}
            setAlertHapus={setAlertHapus}
          /> */}
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      <div className="bg-white p-3 rounded-lg shadow-md mb-4 w-full">
        <h1 className="font-bold text-lg">Tambah Kategori</h1>
        <div className="mt-3">
          <form onSubmit={handleSubmit}>
            <label className="label">Nama Kategori</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={nama}
              onChange={(e) => {
                setNama(e.target.value);
                if (e.target.value) {
                  setAlert({ show: false, type: "", message: "" }); // Reset alert saat ada input
                }
              }}
            />
            <div className="flex justify-end mt-1">
              <button
                type="submit"
                className="btn btn-primary mt-3 text-white flex items-center"
                disabled={isLoading}
              >
                {isLoading ? <LoadingButton /> : "Tambah"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="bg-white p-3 rounded-lg shadow-md w-full">
        {alert.show && (
          <div
            role="alert"
            className={`alert mb-2 text-sm text-white md:text-base flex justify-between ${
              alert.type === "success" ? "alert-success" : "alert-error"
            }`}
          >
            <div className="flex items-center gap-2">
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
                  d={
                    alert.type === "success"
                      ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  }
                />
              </svg>
              <span>{alert.message}</span>
            </div>
            <span
              className="p-2 hover:bg-white/10 transition-all rounded-lg cursor-pointer"
              onClick={() => setAlert({ show: false, type: "", message: "" })}
            >
              <AiOutlineClose />
            </span>
          </div>
        )}

        {alertHapus && (
          <div
            role="alert"
            className={`alert alert-success mb-2 text-sm text-white md:text-base flex justify-between `}
          >
            <div className="flex items-center gap-2">
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
              <span>Berhasil hapus kategori!</span>
            </div>
            <span
              className="p-2 hover:bg-white/10 transition-all rounded-lg cursor-pointer"
              onClick={() => setAlertHapus(false)}
            >
              <AiOutlineClose />
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
        />
      </div>
    </div>
  );
};

export default Kategori;
