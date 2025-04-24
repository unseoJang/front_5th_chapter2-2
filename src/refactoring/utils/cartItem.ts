import { CartItem, Product } from "../../types";

export const findCartItem = (cart: CartItem[], productId: string) => {
	return cart.find((item) => item.product.id === productId);
};

export const increaseCartItemQuantity = (
cart: CartItem[], productId: string, p0: number) => {
	return cart.map((item) => {
		const { product, quantity } = item;
		const { id, stock } = product;
		return id === productId
			? {
					...item,
					quantity: Math.min(quantity + quantity, stock),
			  }
			: item;
	});
};

export const createNewCartItem = (
	cart: CartItem[],
	product: Product
): CartItem[] => {
	return [...cart, { product, quantity: 1 }];
};
