// src/api/products.ts
import axios from "axios";
import { Product } from "../types";

export const fetchProducts = async (): Promise<Product[]> => {
	const res = await axios.get("/api/products");
	console.log("res=>>", res);
	return res.data;
};
