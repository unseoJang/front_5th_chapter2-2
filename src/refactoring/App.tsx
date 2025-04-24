import { useEffect, useState } from "react";
import { CartPage } from "./components/CartPage.tsx";
import { AdminPage } from "./components/AdminPage.tsx";
import axios from "axios";

// import { Coupon, Product } from "../types.ts";
// import { useCoupons, useProducts } from "./hooks";

import { ProductProvider } from "./contexts/ProductContext";
import { CouponProvider } from "./contexts/CouponContext";
import { fetchCoupons } from "../api/coupons.ts";
import { fetchProducts } from "../api/product.ts";
import { initialProducts, initialCoupons } from "../mocks/mockData.ts";
import { Coupon, Product } from "../types.ts";

// const initialProducts: Product[] = [
// 	{
// 		id: "p1",
// 		name: "상품1",
// 		price: 10000,
// 		stock: 20,
// 		discounts: [
// 			{ quantity: 10, rate: 0.1 },
// 			{ quantity: 20, rate: 0.2 },
// 		],
// 	},
// 	{
// 		id: "p2",
// 		name: "상품2",
// 		price: 20000,
// 		stock: 20,
// 		discounts: [{ quantity: 10, rate: 0.15 }],
// 	},
// 	{
// 		id: "p3",
// 		name: "상품3",
// 		price: 30000,
// 		stock: 20,
// 		discounts: [{ quantity: 10, rate: 0.2 }],
// 	},
// ];

// const initialCoupons: Coupon[] = [
// 	{
// 		name: "5000원 할인 쿠폰",
// 		code: "AMOUNT5000",
// 		discountType: "amount",
// 		discountValue: 5000,
// 	},
// 	{
// 		name: "10% 할인 쿠폰",
// 		code: "PERCENT10",
// 		discountType: "percentage",
// 		discountValue: 10,
// 	},
// ];

const App = () => {
	const [products, setProducts] = useState<Product[] | null>(null);
	const [coupons, setCoupons] = useState<Coupon[] | null>(null);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const data = await fetchProducts();
				setProducts(data);
			} catch (err) {
				console.error("상품 불러오기 실패", err);
			}
		};

		const loadCoupons = async () => {
			try {
				const data = await fetchCoupons();
				setCoupons(data);
			} catch (err) {
				console.error("쿠폰 불러오기 실패", err);
			}
		};

		loadProducts();
		loadCoupons();
	}, []);

	if (!products || !coupons) {
		return <div className="p-4 text-center">데이터 불러오는 중...</div>;
	}

	return (
		<ProductProvider initialProducts={products ?? undefined}>
			<CouponProvider initialCoupons={coupons ?? undefined}>
				<div className="min-h-screen bg-gray-100">
					<nav className="bg-blue-600 text-white p-4">
						<div className="container mx-auto flex justify-between items-center">
							<h1 className="text-2xl font-bold">쇼핑몰 관리 시스템</h1>
							<button
								onClick={() => setIsAdmin(!isAdmin)}
								className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-blue-100"
							>
								{isAdmin ? "장바구니 페이지로" : "관리자 페이지로"}
							</button>
						</div>
					</nav>
					<main className="container mx-auto mt-6">
						{isAdmin ? <AdminPage /> : <CartPage />}
					</main>
				</div>
			</CouponProvider>
		</ProductProvider>
	);
};

export default App;
