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
		let appliedDiscount = 0
		for (const discount of discounts) {
			if (quantity >= discount.quantity) {
				appliedDiscount = Math.max(appliedDiscount, discount.rate)
			}
		}
		return appliedDiscount
	}

	return {
		getMaxDiscount,
		getAppliedDiscount,
	}
}
