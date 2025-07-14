import useProductStore from "../store/productStore";
import type { LoginForm } from "../types/auth";
import type { Product, ProductForm, ProductParams } from "../types/product";
import type { ResponseProduct } from "../types/res";

export const login = async (data: LoginForm): Promise<boolean> => {
    if (data.username === 'admin' && data.password === 'admin') {
        return true;
    }
    return false;
}

export const getProducts = async (data: ProductParams): Promise<ResponseProduct> => {
    const { category = '', page = 1, search = '' } = data;
    const products = useProductStore.getState().products || [];
    const pageSize = 4;
    let filteredProducts = products;

    if (category.trim()) {
        const categoryList = category.split(',').map(c => c.trim());
        filteredProducts = filteredProducts.filter((product: Product) =>
            categoryList.includes(product.category)
        );
    }

    if (search.trim()) {
        const searchLower = search.toLowerCase();
        filteredProducts = filteredProducts.filter((product: any) =>
            product.name.toLowerCase().includes(searchLower)
        );
    }


    const start = (page - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(start, start + pageSize);
    const totalpage = Math.ceil(filteredProducts.length / pageSize);
    const response = {
        data: paginatedProducts,
        totalPage: totalpage
    }
    return response;
}

export const getProductById = async (id: string): Promise<Product> => {
    const products = useProductStore.getState().products || [];
    const product = products.find((product: Product) => product.id === id);
    if (!product) {
        throw new Error(`Product with id ${id} not found`);
    }
    return product;
}

export const addProduct = async (product: ProductForm): Promise<Product> => {
    const id = (useProductStore.getState().products.length).toString();
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt; 
    const newProduct: Product = { ...product, id, createdAt, updatedAt };
    useProductStore.getState().addProduct(newProduct);
    return newProduct;
}

export const editProductById = async (id: string, updatedData: Partial<Product>): Promise<Product> => {
    const { products } = useProductStore.getState();
    const productIndex = products.findIndex((product: Product) => product.id === id);
    if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
    }
    const updatedProduct = { ...products[productIndex], ...updatedData };
    useProductStore.getState().updateProduct(id, updatedData);
    return updatedProduct;
}

export const deleteProductById = async (id: string): Promise<void> => {
    const { products, removeProduct } = useProductStore.getState();
    const productIndex = products.findIndex((product: Product) => product.id === id);
    if (productIndex === -1) {
        throw new Error(`Product with id ${id} not found`);
    }
    removeProduct(id);
}

