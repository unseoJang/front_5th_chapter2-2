// useCart.ts
import { useState } from "react"
import { CartItem, Coupon, Product } from "../../types"
import { calculateCartTotal, updateCartItemQuantity } from "../models/cart"
import { getRemainingStock } from "../../origin/utils/cart"
import {
	createNewCartItem,
	findCartItem,
	increaseCartItemQuantity,
} from "../utils/cartItem"
import { useLocalStorage } from "./useLocalStorage"

export const useCart = () => {
	const [cart, setCart] = useLocalStorage<CartItem[]>("cart", [])
	const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null)

	/**
	 * 장바구니에 상품 추가 로직
	 * @param product
	 * @returns
	 */
	const addToCart = (product: Product) => {
		const remainingStock = getRemainingStock(product, cart)
		if (remainingStock <= 0) return

		setCart((prevCart: CartItem[]) => {
			const existingItem = findCartItem(prevCart, product.id)
			if (existingItem) {
				return increaseCartItemQuantity(prevCart, product.id)
			}
			return createNewCartItem(prevCart, product)
		})
	}

	/**
	 * 장바구니에서 상품 제거 로직
	 * @param productId
	 */
	const removeFromCart = (productId: string) => {
		setCart((prevCart: CartItem[]) =>
			prevCart.filter(
				(item: { product: { id: string } }) => item.product.id !== productId
			)
		)
	}

	/**
	 * 장바구니에서 상품 수량 업데이트 로직
	 * @param productId
	 * @param newQuantity
	 */
	const updateQuantity = (productId: string, newQuantity: number) => {
		setCart((prevCart: CartItem[]) =>
			updateCartItemQuantity(prevCart, productId, newQuantity)
		)
	}

	/**
	 * 장바구니에 쿠폰 적용 로직
	 * @param coupon
	 */
	const applyCoupon = (coupon: Coupon) => {
		setSelectedCoupon(coupon)
	}

	const calculateTotal = () => calculateCartTotal(cart, selectedCoupon)
	return {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		applyCoupon,
		calculateTotal,
		selectedCoupon,
	}
}
