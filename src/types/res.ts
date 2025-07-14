import type { Product } from "./product";

export type ResponseProduct = {
    data: Product[];
    totalPage: number;
}