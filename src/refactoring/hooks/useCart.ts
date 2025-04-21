// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";
import { getRemainingStock } from "../../origin/utils/cart";

export const useCart = () => {
	const [cart, setCart] = useState<CartItem[]>([]);
	const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

	/**
	 * 장바구니에 상품 추가 로직
	 * @param product
	 * @returns
	 */
	const addToCart = (product: Product) => {
		const remainingStock = getRemainingStock(product, cart);
		if (remainingStock <= 0) return;

		setCart((prevCart) => {
			const existingItem = prevCart.find(
				(item) => item.product.id === product.id
			);
			if (existingItem) {
				return prevCart.map((item) =>
					item.product.id === product.id
						? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
						: item
				);
			}
			return [...prevCart, { product, quantity: 1 }];
		});
	};

	/**
	 * 장바구니에서 상품 제거 로직
	 * @param productId
	 */
	const removeFromCart = (productId: string) => {
		setCart((prevCart) =>
			prevCart.filter((item) => item.product.id !== productId)
		);
	};

	/**
	 * 장바구니에서 상품 수량 업데이트 로직
	 * @param productId
	 * @param newQuantity
	 */
	const updateQuantity = (productId: string, newQuantity: number) => {
		setCart((prevCart) =>
			updateCartItemQuantity(prevCart, productId, newQuantity)
		);
	};

	/**
	 * 장바구니에 쿠폰 적용 로직
	 * @param coupon
	 */
	const applyCoupon = (coupon: Coupon) => {
		setSelectedCoupon(coupon);
	};

	const calculateTotal = () => calculateCartTotal(cart, selectedCoupon);
	return {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		applyCoupon,
		calculateTotal,
		selectedCoupon,
	};
};
