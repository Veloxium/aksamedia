import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "../types/product";
import productsjson from "../json/fakeproducts.json";

interface ProductState {
    products: Product[];
    addProduct: (product: Product) => void;
    removeProduct: (id: string) => void;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
    clearProducts: () => void;
}

const useProductStore = create(
    persist<ProductState>(
        (set) => ({
            products: productsjson,
            addProduct: (product: Product) => set((state) => ({ products: [product, ...state.products] })),
            removeProduct: (id: string) => set((state) => ({ products: state.products.filter(product => product.id !== id) })),
            updateProduct: (id: string, updatedProduct: Partial<Product>) => set((state) => ({
                products: state.products.map(product => product.id === id ? { ...product, ...updatedProduct } : product)
            })),
            clearProducts: () => set({ products: [] })
        }),
        {
            name: "product-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);

export default useProductStore;
