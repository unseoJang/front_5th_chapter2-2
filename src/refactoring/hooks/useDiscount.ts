// src/hooks/useDiscount.ts
import { Discount } from "../../types"

export const useDiscount = () => {
	const getMaxDiscount = (discounts: { quantity: number; rate: number }[]) => {
		return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0)
	}

	const getAppliedDiscount = (
		discounts: Discount[],
		quantity: number
	): number => {
		return discounts.reduce((maxRate, discount) => {
			return quantity >= discount.quantity
				? Math.max(maxRate, discount.rate)
				: maxRate
		}, 0)
	}

	return {
		getMaxDiscount,
		getAppliedDiscount,
	}
}
