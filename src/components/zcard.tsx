import { Edit, Trash } from "lucide-react";

type Product = {
  id: string | number;
  name: string;
  category: string;
  stock: number;
  price: number;
  createdAt: string | Date;
};

type ZCardProps = {
  product: Product;
  onDelete?: (product: Product) => void;
};

function ZCard({ product, onDelete }: ZCardProps) {
  return (
    <div key={product.id} className="flex rounded-md">
      <div className="w-full border dark:border-zinc-400 p-4 rounded-l-lg bg-zgradient text-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p
            className={`text-gray-600 font-semibold 
                        ${
                          product.category === "Fruits"
                            ? "text-red-500"
                            : product.category === "Vegetables"
                            ? "text-green-500"
                            : "text-yellow-500"
                        }`}
          >
            {product.category}
          </p>
        </div>
        <p className="text-gray-200 mb-1">Stock: {product.stock}</p>
        <span className="font-bold">
          Rp.{" "}
          {Number(product.price).toLocaleString("id-ID", {
            currency: "IDR",
          })}
        </span>
        <div className="mt-2 flex justify-end">
          <p className="text-gray-300 text-xs">
            {new Date(product.createdAt).toLocaleString("id-ID", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-around bg-gray-100 dark:bg-zinc-200 rounded-r-md">
        <a href={`/edit?id=${product.id}`} className="mb-2" aria-label="Edit">
          <Edit size={30} className="text-gray-400 hover:text-black" />
        </a>
        <button
          type="button"
          onClick={() => onDelete?.(product)}
          aria-label="Delete"
        >
          <Trash size={30} className="text-red-300 hover:text-red-400" />
        </button>
      </div>
    </div>
  );
}

export default ZCard;
