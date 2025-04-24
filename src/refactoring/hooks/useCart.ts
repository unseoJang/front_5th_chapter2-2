// useCart.ts
import { useState } from "react";
import { CartItem, Coupon, Product } from "../../types";
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart";
import { getRemainingStock } from "../../origin/utils/cart";
import {
	createNewCartItem,
	findCartItem,
	increaseCartItemQuantity,
} from "../utils/cartItem";

export const useCart = (p0?: { id: string; name: string; price: number; stock: number; discounts: never[]; }[], p1?: never[]) => {
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
			const existingItem = findCartItem(prevCart, product.id);
			if (existingItem) {
				return increaseCartItemQuantity(prevCart, product.id, 1);
			}
			return createNewCartItem(prevCart, product);
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
