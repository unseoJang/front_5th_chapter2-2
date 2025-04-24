// src/api/coupons.ts
import axios from "axios";
import { Coupon } from "../types";

export const fetchCoupons = async (): Promise<Coupon[]> => {
	const res = await axios.get("/api/coupons");
	return res.data;
};
