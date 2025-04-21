// utils/carts.ts

import { CartItem, Product } from "../../types";

export const getRemainingStock = (product: Product, cart: CartItem[]) => {
	const cartItem = cart.find(item => item.product.id === product.id);
	return product.stock - (cartItem?.quantity || 0);
};