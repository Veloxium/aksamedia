import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import IndexLayout from "../layouts/IndexLayout";
import { addProduct } from "../services/apiService";
import type { ProductForm } from "../types/product";

function AddPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>();
  const categories = ["Fruits", "Vegetables", "Food"];
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = await addProduct(data);
      if (res) {
        setMessage("Produk berhasil ditambahkan!");
        setTimeout(() => navigate("/"), 1200);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IndexLayout>
      <div className="container mx-auto p-4"></div>
      <div className="bg-white dark:bg-zinc-900 shadow shadow-zprimary rounded p-6 max-w-md mx-auto place-items-center mt-10">
      <h1 className="text-2xl font-semibold dark:text-white">Tambah Produk</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 my-2 w-full"
      >
        <label htmlFor="name" className="dark:text-white">Nama</label>
        <input
        {...register("name", { required: true })}
        id="name"
        type="text"
        placeholder="Masukkan nama produk"
        className={`text-black dark:text-white dark:bg-zinc-800 px-2 py-1 border-2 border-gray-400 dark:border-zinc-700 rounded-md
          ${
            errors.name
            ? "border-red-500 focus:outline-red-500"
            : "border-gray-400 dark:border-zinc-700"
          }`}
        />
        {errors.name && (
        <span className="text-red-500 text-sm">
          Nama tidak boleh kosong
        </span>
        )}
        <label htmlFor="price" className="dark:text-white">Harga</label>
        <input
        {...register("price", { required: true })}
        id="price"
        type="number"
        placeholder="Masukkan harga produk"
        className={`text-black dark:text-white dark:bg-zinc-800 px-2 py-1 border-2 border-gray-400 dark:border-zinc-700 rounded-md
          ${
            errors.price
            ? "border-red-500 focus:outline-red-500"
            : "border-gray-400 dark:border-zinc-700"
          }`}
        />
        {errors.price && (
        <span className="text-red-500 text-sm">
          Harga tidak boleh kosong
        </span>
        )}
        <label htmlFor="category" className="dark:text-white">Category</label>
        <div
        className={`text-black dark:text-white dark:bg-zinc-800 px-2 py-1 border-2 border-gray-400 dark:border-zinc-700 rounded-md
          ${
            errors.category
            ? "border-red-500 focus:outline-red-500"
            : "border-gray-400 dark:border-zinc-700"
          }`}
        >
        <select
          {...register("category", { required: true })}
          id="category"
          className="w-full bg-transparent dark:bg-zinc-800 dark:text-white focus:outline-none"
          defaultValue=""
        >
          <option value="" disabled>
          Pilih kategori
          </option>
          {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
          ))}
        </select>
        </div>
        {errors.category && (
        <span className="text-red-500 text-sm">
          Kategori tidak boleh kosong
        </span>
        )}
        <label htmlFor="stock" className="dark:text-white">Stok</label>
        <input
        {...register("stock", { required: true })}
        id="stock"
        type="number"
        placeholder="Masukkan jumlah stok"
        className={`text-black dark:text-white dark:bg-zinc-800 px-2 py-1 border-2 border-gray-400 dark:border-zinc-700 rounded-md
          ${
            errors.stock
            ? "border-red-500 focus:outline-red-500"
            : "border-gray-400 dark:border-zinc-700"
          }`}
        />
        {errors.stock && (
        <span className="text-red-500 text-sm">
          Stok tidak boleh kosong
        </span>
        )}

        {message && (
        <span className="bg-green-200 dark:bg-green-900 text-sm px-2 py-1 rounded-md text-green-800 dark:text-green-200">
          {message}
        </span>
        )}

        <button
        type="submit"
        className="bg-zgradient flex justify-center items-center text-white px-4 py-2 rounded-md hover:bg-black dark:hover:bg-zinc-800 transition-colors mt-2"
        >
        {isLoading ? <Loader2 className="animate-spin" /> : "Tambah Produk"}
        </button>
        <a
        href="/"
        className="bg-gray-100 dark:bg-zinc-800 flex justify-center items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-zinc-700 transition-colors"
        >
        Kembali
        </a>
      </form>
      </div>
    </IndexLayout>
  );
}

export default AddPage;
