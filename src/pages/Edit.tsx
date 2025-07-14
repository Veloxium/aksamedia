import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import IndexLayout from "../layouts/IndexLayout";
import { editProductById, getProductById } from "../services/apiService";
import type { Product, ProductForm } from "../types/product";
import { useNavigate } from "react-router-dom";

function EditPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductForm>();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || "";
  const [product, setProduct] = useState<Product>();
  const categories = ["Fruits", "Vegetables", "Food"];
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await getProductById(id);
    setProduct(res);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        category: product.category,
        stock: product.stock,
      });
    }
  }, [product, reset]);

  const onSubmit = async (data: ProductForm) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      const res = editProductById(id, data);
      if (!!res) {
        setMessage("Update Profile Berhasil!");
        setTimeout(() => navigate("/aksamedia"), 1200);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IndexLayout>
      <div className="container mx-auto p-4">
        <div className="bg-white dark:bg-zinc-900 shadow shadow-zprimary rounded p-6 max-w-md mx-auto place-items-center mt-10">
          <h1 className="text-2xl font-semibold dark:text-white">
            Edit Product
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-2 my-2 w-full"
          >
            <label htmlFor="name" className="dark:text-white">
              Nama
            </label>
            <input
              {...register("name", { required: true })}
              id="name"
              type="text"
              className={`text-black dark:text-white dark:bg-gray-700 px-2 py-1 border-2 border-gray-400 dark:border-gray-600 rounded-md
                ${
                  errors.name
                    ? "border-red-500 focus:outline-red-500"
                    : "border-gray-400 dark:border-gray-600"
                }
                  `}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                Nama tidak boleh kosong
              </span>
            )}
            <label htmlFor="price" className="dark:text-white">
              Harga
            </label>
            <input
              {...register("price", { required: true })}
              id="price"
              type="number"
              className={`text-black dark:text-white dark:bg-gray-700 px-2 py-1 border-2 border-gray-400 dark:border-gray-600 rounded-md
                ${
                  errors.price
                    ? "border-red-500 focus:outline-red-500"
                    : "border-gray-400 dark:border-gray-600"
                }
                  `}
            />
            {errors.price && (
              <span className="text-red-500 text-sm">
                Harga tidak boleh kosong
              </span>
            )}
            <label htmlFor="category" className="dark:text-white">
              Category
            </label>
            <div
              className={`text-black dark:text-white dark:bg-gray-700 px-2 py-1 border-2 border-gray-400 dark:border-gray-600 rounded-md
                  ${
                    errors.category
                      ? "border-red-500 focus:outline-red-500"
                      : "border-gray-400 dark:border-gray-600"
                  }
                  `}
            >
              <select
                {...register("category", { required: true })}
                id="category"
                className="w-full bg-transparent dark:bg-gray-700 dark:text-white focus:outline-none"
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
            <label htmlFor="stock" className="dark:text-white">
              Stok
            </label>
            <input
              {...register("stock", { required: true })}
              id="stock"
              type="number"
              className={`text-black dark:text-white dark:bg-gray-700 px-2 py-1 border-2 border-gray-400 dark:border-gray-600 rounded-md
                ${
                  errors.stock
                    ? "border-red-500 focus:outline-red-500"
                    : "border-gray-400 dark:border-gray-600"
                }
                  `}
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
              className="bg-zgradient flex justify-center items-center text-white px-4 py-2 rounded-md hover:bg-black dark:hover:bg-gray-900 transition-colors mt-2"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Simpan Perubahan"
              )}
            </button>
            <a
              href="/aksamedia"
              className="bg-gray-100 dark:bg-gray-700 flex justify-center items-center px-4 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              Kembali
            </a>
          </form>
        </div>
      </div>
    </IndexLayout>
  );
}

export default EditPage;
