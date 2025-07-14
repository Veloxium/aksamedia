import {
  ArrowLeft,
  ArrowRight,
  Funnel,
  ListX,
  Package,
  Plus,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import ZCard from "../components/zcard";
import IndexLayout from "../layouts/IndexLayout";
import { deleteProductById, getProducts } from "../services/apiService";
import type { ResponseProduct } from "../types/res";
import DeleteDialog from "../components/deletedialog";

function DashboardPage() {
  const params = new URLSearchParams(window.location.search);
  const search = params.get("search") || "";
  const category = params.get("category") || "";
  const page = params.get("page") || 1;
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [products, setProducts] = useState<ResponseProduct>();
  const [searchInput, setSearchInput] = useState(search);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryList, setCategoryList] = useState<string[]>(
    category ? category.split(",") : []
  );

  const fetchProducts = async () => {
    const paginatedProducts = await getProducts({
      page: Number(page),
      search: search,
      category: category,
    });
    setProducts(paginatedProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handlePage = (newPage: number) => {
    if (Number(page) !== newPage) {
      const params = new URLSearchParams(window.location.search);
      params.set("page", String(newPage));
      window.location.search = params.toString();
    }
  };

  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(window.location.search);
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    if ("search" in updates || "category" in updates) {
      params.set("page", "1");
    }
    window.location.search = params.toString();
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateQuery({ search: searchInput });
  };

  const handleCategoryChange = (cat: string) => {
    const newCategories = categoryList.includes(cat)
      ? categoryList.filter((c) => c !== cat)
      : [...categoryList, cat];
    setCategoryList(newCategories);
    updateQuery({ category: newCategories.join(",") });
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      await deleteProductById(id);
      await fetchProducts();
      setIsDialogOpen(false);
      setSelectedId(null);
    } catch (err: any) {
      alert(err?.message || "Failed to delete product.");
    }
  };

  return (
    <IndexLayout>
      <div className="container mx-auto p-4">
        <div className="md:mt-10 flex flex-col md:flex-row space-y-6 w-full justify-between">
          <div className="text-4xl font-semibold flex items-center gap-2 ">
            <h1>Semua Products</h1>
            <span>
              <Package
                size={40}
                className="text-zprimary dark:text-zprimary-light"
              />
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-full">
              <form onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  placeholder="Cari products..."
                  className="text-black dark:text-white placeholder-gray-400 dark:placeholder-gray-300 px-2 py-1 border-2 border-gray-400 dark:border-zprimary-light focus:outline-zprimary dark:focus:outline-zprimary-light bg-white dark:bg-zinc-900 rounded w-full md:w-[280px] transition-colors"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <button className="absolute h-full w-8 p-1 right-1 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-zprimary-light">
                  <Search />
                </button>
              </form>
            </div>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="p-2 rounded hover:bg-gray-200 dark:hover:bg-zinc-800 transition-colors"
              >
                <Funnel className="text-gray-400 hover:text-black dark:text-zprimary-light dark:hover:text-white" />
              </button>
              {isFilterOpen && (
                <div className="absolute w-[200px] -left-20 mt-2 bg-white dark:bg-zinc-900 border border-zprimary dark:border-zprimary-light rounded-md p-4 shadow-lg transition-colors">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold mb-2 dark:text-white">
                      Filter Kategori
                    </h3>
                    <button
                      className="text-red-300 hover:text-red-500 dark:text-red-400 dark:hover:text-red-500"
                      onClick={() => {
                        setCategoryList([]);
                        updateQuery({ category: "" });
                      }}
                    >
                      <ListX />
                    </button>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <label className="dark:text-white">
                      <input
                        type="checkbox"
                        className="mr-2 accent-zprimary dark:accent-zprimary-light"
                        checked={categoryList.includes("Fruits")}
                        onChange={() => handleCategoryChange("Fruits")}
                      />
                      Fruits
                    </label>
                    <label className="dark:text-white">
                      <input
                        type="checkbox"
                        className="mr-2 accent-zprimary dark:accent-zprimary-light"
                        checked={categoryList.includes("Vegetables")}
                        onChange={() => handleCategoryChange("Vegetables")}
                      />
                      Vegetables
                    </label>
                    <label className="dark:text-white">
                      <input
                        type="checkbox"
                        className="mr-2 accent-zprimary dark:accent-zprimary-light"
                        checked={categoryList.includes("Food")}
                        onChange={() => handleCategoryChange("Food")}
                      />
                      Food
                    </label>
                  </div>
                </div>
              )}
            </div>
            <div>
              <a
                href="/add"
                className="p-2 rounded bg-zgradient dark:bg-zprimary-light text-white hover:bg-zprimary/80 dark:hover:bg-zprimary flex items-center gap-2 transition-colors"
              >
                <Plus />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {products?.data.map((product) => (
              <ZCard
                key={product.id}
                product={product}
                onDelete={() => {
                  setSelectedId(product.id);
                  setIsDialogOpen(true);
                }}
              />
            ))}
          </div>
          {products && products.totalPage > 1 && (
            <div className="flex justify-end my-8">
              <nav className="inline-flex items-center space-x-2">
                <button
                  disabled={Number(page) === 1}
                  className={`px-3 py-1 rounded transition-colors ${
                    Number(page) === 1
                      ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
                      : "bg-white dark:bg-zinc-900 border text-zprimary dark:text-zprimary-light dark:border-zprimary-light"
                  }`}
                  onClick={() => handlePage(Number(page) - 1)}
                  aria-label="Previous page"
                >
                  <ArrowLeft />
                </button>
                {Array.from({ length: products.totalPage }, (_, i) => (
                  <button
                    key={i + 1}
                    className={`px-3 py-1 rounded transition-colors ${
                      Number(page) === i + 1
                        ? "bg-zprimary dark:bg-zprimary-light text-white"
                        : "bg-white dark:bg-zinc-900 border text-zprimary dark:text-zprimary-light dark:border-zprimary-light"
                    }`}
                    onClick={() => handlePage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  disabled={Number(page) === products.totalPage}
                  className={`px-3 py-1 rounded transition-colors ${
                    Number(page) === products.totalPage
                      ? "bg-gray-200 dark:bg-zinc-800 text-gray-400 dark:text-zinc-600 cursor-not-allowed"
                      : "bg-white dark:bg-zinc-900 border text-zprimary dark:text-zprimary-light dark:border-zprimary-light"
                  }`}
                  onClick={() => handlePage(Number(page) + 1)}
                  aria-label="Next page"
                >
                  <ArrowRight />
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>
      <DeleteDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        deleteProduct={() => {
          handleDeleteProduct(selectedId!);
        }}
      />
    </IndexLayout>
  );
}

export default DashboardPage;
