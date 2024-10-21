"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import LoadingButton from "@/app/loadingButton";

const Tambah = () => {
  const [kategori, setKategori] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [files, setFiles] = useState<File[]>([]);
  const [kodeProduk, setKodeProduk] = useState("");
  const [nama, setNama] = useState("");
  const [brand, setBrand] = useState("");
  const [ukuran, setUkuran] = useState([""]);
  const [warna, setWarna] = useState([""]);
  const [stok, setStok] = useState("");
  const [modal, setModal] = useState("");
  const [hargaJual, setHargaJual] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [selectKategori, setSelectKategori] = useState("");

  // State untuk validasi
  const [errors, setErrors] = useState({
    nama: "",
    brand: "",
    ukuran: "",
    warna: "",
    stok: "",
    modal: "",
    hargaJual: "",
    deskripsi: "",
    selectKategori: "",
  });

  useEffect(() => {
    loadKategori();
  }, []);

  const loadKategori = async () => {
    try {
      const res = await axios.get("/api/kategori");
      const data = await res.data;
      setKategori(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    if (selectedFiles.length + files.length > 6) {
      alert("You can only upload a maximum of 6 files.");
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const validateForm = () => {
    const newErrors = {
      nama: "",
      brand: "",
      ukuran: "",
      warna: "",
      stok: "",
      modal: "",
      hargaJual: "",
      deskripsi: "",
      selectKategori: "",
    };

    let isValid = true;

    if (!nama) {
      newErrors.nama = "Nama Produk tidak boleh kosong.";
      isValid = false;
    }

    if (!brand) {
      newErrors.brand = "Nama Brand tidak boleh kosong.";
      isValid = false;
    }

    if (!ukuran) {
      newErrors.ukuran = "Ukuran tidak boleh kosong.";
      isValid = false;
    }

    if (!warna) {
      newErrors.warna = "Warna tidak boleh kosong.";
      isValid = false;
    }

    if (!stok) {
      newErrors.stok = "Stok tidak boleh kosong.";
      isValid = false;
    }

    if (!modal) {
      newErrors.modal = "Harga Modal tidak boleh kosong.";
      isValid = false;
    }

    if (!hargaJual) {
      newErrors.hargaJual = "Harga Jual tidak boleh kosong.";
      isValid = false;
    }

    if (!deskripsi) {
      newErrors.deskripsi = "Deskripsi Produk tidak boleh kosong.";
      isValid = false;
    }

    if (!selectKategori) {
      newErrors.selectKategori = "Kategori harus dipilih.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleTambah = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Jika form tidak valid, berhenti di sini
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("kodeProduk", kodeProduk);
      formData.append("nama", nama);
      formData.append("brand", brand);
      formData.append("ukuran", JSON.stringify(ukuran));
      formData.append("warna", JSON.stringify(warna));
      formData.append("stok", stok);
      formData.append("hargaModal", modal);
      formData.append("hargaJual", hargaJual);
      formData.append("deskripsi", deskripsi);
      formData.append("kategoriId", selectKategori);

      // Tambahkan file ke formData
      files.forEach((file) => {
        formData.append("files", file);
      });

      const res = await axios.post("/api/produk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.pesan === "sukses") {
        router.push("/admin/produk?status=sukses");
      }
    } catch (error) {
      console.error(error);
      router.push("/admin/produk?status=gagal");
    } finally {
      setIsLoading(false);
    }
  };

  const addUkuran = () => {
    setUkuran([...ukuran, ""]);
  };

  const removeUkuran = (index: number) => {
    setUkuran(ukuran.filter((_, i) => i !== index));
  };

  const addWarna = () => {
    setWarna([...warna, ""]); // Tambah input baru, maksimal 2
  };

  const removeWarna = (index: number) => {
    const newWarna = warna.filter((_, i) => i !== index); // Hapus input berdasarkan index
    setWarna(newWarna);
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Tambah Data Produk</h1>
      <form className="w-full mt-4" onSubmit={handleTambah}>
        <div className="w-full">
          <label className="label">Kode Produk</label>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Masukkan Kode Produk"
            value={kodeProduk}
            onChange={(e) => setKodeProduk(e.target.value)}
          />
          {errors.deskripsi && (
            <p className="text-red-500">{errors.deskripsi}</p>
          )}
        </div>
        <div className="sm:gap-2 sm:flex w-full">
          <div className="sm:w-1/2">
            <div>
              <label className="label">Nama Produk</label>
              <input
                type="text"
                placeholder="Masukkan Nama Produk"
                className="input input-bordered w-full"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
              />
              {errors.nama && <p className="text-red-500">{errors.nama}</p>}
            </div>
            <div>
              <label className="label">Nama Brand</label>
              <input
                type="text"
                placeholder="Masukkan Nama Brand"
                className="input input-bordered w-full"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              />
              {errors.brand && <p className="text-red-500">{errors.brand}</p>}
            </div>
            <div>
              <label className="label">Harga Modal</label>
              <label className="input input-bordered flex items-center gap-2">
                Rp
                <input
                  type="text"
                  inputMode="numeric"
                  className="grow"
                  placeholder="Modal"
                  value={modal}
                  onChange={(e) => setModal(e.target.value)}
                />
              </label>
              {errors.modal && <p className="text-red-500">{errors.modal}</p>}
            </div>
            <div>
              <label className="label">Warna</label>
              <div className="flex flex-wrap mb-2 w-full">
                {warna.map((warnaItem, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-2 mr-2 w-full lg:w-[375px]"
                  >
                    <input
                      type="text"
                      placeholder="Masukkan Warna"
                      className="input input-bordered w-full" // Mengatur lebar input
                      value={warnaItem}
                      onChange={(e) => {
                        const newWarna = [...warna];
                        newWarna[index] = e.target.value;
                        setWarna(newWarna);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center mb-2">
                <button
                  type="button"
                  onClick={addWarna}
                  className="btn btn-primary mr-2 text-white"
                >
                  <FaPlus />
                </button>
                {warna.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeWarna(warna.length - 1)} // Menghapus input terakhir
                    className="btn btn-error"
                  >
                    <AiOutlineClose />
                  </button>
                )}
              </div>
              {errors.warna && <p className="text-red-500">{errors.warna}</p>}
            </div>
          </div>
          <div className="sm:w-1/2">
            <div>
              <label className="label">Kategori</label>
              <select
                className="select select-bordered w-full"
                value={selectKategori}
                onChange={(e) => setSelectKategori(e.target.value)}
              >
                <option disabled selected value={""}>
                  Pilih Kategori
                </option>
                {kategori.map((item: any) => (
                  <option key={item.id} value={item.id}>
                    {item.nama}
                  </option>
                ))}
              </select>
              {errors.selectKategori && (
                <p className="text-red-500">{errors.selectKategori}</p>
              )}
            </div>
            <div>
              <label className="label">Stok</label>
              <input
                type="text"
                inputMode="numeric"
                placeholder="Masukkan Stok Produk"
                className="input input-bordered w-full"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
              {errors.stok && <p className="text-red-500">{errors.stok}</p>}
            </div>
            <div>
              <label className="label">Harga Jual</label>
              <label className="input input-bordered flex items-center gap-2">
                Rp
                <input
                  type="text"
                  inputMode="numeric"
                  className="grow"
                  placeholder="Harga Jual"
                  value={hargaJual}
                  onChange={(e) => setHargaJual(e.target.value)}
                />
              </label>
              {errors.hargaJual && (
                <p className="text-red-500">{errors.hargaJual}</p>
              )}
            </div>
            <div>
              <label className="label">Ukuran</label>
              <div className="flex flex-wrap mb-2 w-full">
                {ukuran.map((ukuranItem, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-2 mr-2 w-full lg:w-[375px]"
                  >
                    <input
                      type="text"
                      placeholder="Masukkan Ukuran"
                      className="input input-bordered w-full"
                      value={ukuranItem}
                      onChange={(e) => {
                        const newUkuran = [...ukuran];
                        newUkuran[index] = e.target.value;
                        setUkuran(newUkuran);
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex items-center mb-2">
                <button
                  type="button"
                  onClick={addUkuran}
                  className="btn btn-primary mr-2 text-white"
                >
                  <FaPlus />
                </button>
                {ukuran.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeUkuran(ukuran.length - 1)} // Menghapus input terakhir
                    className="btn btn-error"
                  >
                    <AiOutlineClose />
                  </button>
                )}
              </div>
              {errors.ukuran && <p className="text-red-500">{errors.ukuran}</p>}
            </div>
          </div>
        </div>
        <div className="w-full">
          <label className="label">Deskripsi Produk</label>
          <textarea
            className="textarea textarea-bordered h-24 w-full"
            placeholder="Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
          ></textarea>
          {errors.deskripsi && (
            <p className="text-red-500">{errors.deskripsi}</p>
          )}
        </div>
        <div className="w-full mb-10">
          <label className="label mb-2">Foto / Video Produk</label>
          <label
            htmlFor="file"
            className="custum-file-upload flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 shadow-lg cursor-pointer"
          >
            <div className="icon flex items-center justify-center mb-4">
              <svg
                viewBox="0 0 24 24"
                fill=""
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 text-gray-400"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z"
                />
              </svg>
            </div>
            <div className="text">
              <span className="font-medium text-gray-400">
                Click to upload image
              </span>
            </div>
            <input
              id="file"
              type="file"
              accept="image/*, video/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {files.length > 0 && (
            <div className="mt-6">
              <p className="font-semibold">Ini Cuma Preview</p>
              <div className="mt-2 gap-4 flex flex-wrap justify-center lg:justify-start">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="relative group w-full sm:w-56 h-56 md:max-w-56" // Set fixed width and height for squares on small screens
                  >
                    {file.type.startsWith("image/") ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`preview ${index}`}
                        className="w-full h-full object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
                      />
                    ) : (
                      <video
                        controls
                        className="w-full h-full object-cover rounded-lg shadow-lg transition-transform transform group-hover:scale-105"
                      >
                        <source src={URL.createObjectURL(file)} />
                        Your browser does not support the video tag.
                      </video>
                    )}
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          <button className="btn btn-primary text-white" type="submit">
            {isLoading ? <LoadingButton /> : "Tambah"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Tambah;
