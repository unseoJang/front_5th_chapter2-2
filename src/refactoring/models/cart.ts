import { CartItem, Coupon } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
	const { product, quantity } = item; // 상품 정보와 카트 수량
	const { price } = product; // 상품 가격과 할인 정보

	const discount = getMaxApplicableDiscount(item); // 최대 할인율 계산
	const itemTotal = price * quantity; // 총 상품 가격
	const discountedTotal = itemTotal * (1 - discount); // 할인 적용 후 총 상품 가격
	return { itemTotal, discountedTotal };
};

export const getMaxApplicableDiscount = (item: CartItem) => {
	const { product, quantity } = item; // 상품 정보와 카트 수량
	const { discounts } = product; // 상품 할인 정보

	return discounts.reduce((maxDiscount, d) => {
		return quantity >= d.quantity && d.rate > maxDiscount
			? d.rate
			: maxDiscount;
	}, 0);
};

/**
 * Calculate the total price of the cart
 * @param cart
 * @param selectedCoupon
 * @returns
 */
export const calculateCartTotal = (
	cart: CartItem[],
	selectedCoupon: Coupon | null
): {
	totalBeforeDiscount: number;
	totalAfterDiscount: number;
	totalDiscount: number;
} => {
	// Calculate total before discount
	const itemTotals = cart.map((item) => {
		const { product } = item; // 상품 정보
		const { price } = product; // 상품 가격과 할인 정보
		const { quantity } = item; // 카트 수량

		const discount = getMaxApplicableDiscount(item);

		const itemTotal = price * quantity; // 총 상품 가격
		const discountedTotal = itemTotal * (1 - discount); // 할인 적용 후 총 상품 가격

		return calculateItemTotal(item);

		// return { itemTotal, discountedTotal };
	});

	// Calculate total after discount
	const totalBeforeDiscount = itemTotals.reduce(
		(sum, curr) => sum + curr.itemTotal,
		0
	);

	// Calculate total after discount
	const preCouponTotalAfterDiscount = itemTotals.reduce(
		(sum, curr) => sum + curr.discountedTotal,
		0
	);

	// Apply coupon if available
	const totalAfterDiscount = selectedCoupon
		? selectedCoupon.discountType === "amount"
			? Math.max(0, preCouponTotalAfterDiscount - selectedCoupon.discountValue)
			: preCouponTotalAfterDiscount * (1 - selectedCoupon.discountValue / 100)
		: preCouponTotalAfterDiscount;

	// Calculate total discount
	const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

	return {
		totalBeforeDiscount: Math.round(totalBeforeDiscount),
		totalAfterDiscount: Math.round(totalAfterDiscount),
		totalDiscount: Math.round(totalDiscount),
	};
};

export const updateCartItemQuantity = (
	cart: CartItem[],
	productId: string,
	newQuantity: number
): CartItem[] => {
	return cart
		.map((item) => {
			if (item.product.id === productId) {
				const maxQuantity = item.product.stock;
				const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
				return updatedQuantity > 0
					? { ...item, quantity: updatedQuantity }
					: null;
			}
			return item;
		})
		.filter((item): item is CartItem => item !== null);
};
