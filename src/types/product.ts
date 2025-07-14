export type ProductForm = {
    name: string;
    price: number;
    category: string;
    stock: number;
};

export type Product = {
    id: string;
    name: string;
    price: number;
    category: string;
    stock: number;
    createdAt: string;
    updatedAt: string;
};

export type ProductParams = {
    page: number;
    search: string;
    category: string;
}