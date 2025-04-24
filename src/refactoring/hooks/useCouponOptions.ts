import { Coupon } from "../../types"

/**
 * Hook to get coupon options for a select input
 * @returns
 */
export const useCouponOptions = () => {
	/**
	 * Get coupon options for a select input
	 * @param coupons
	 * @returns
	 */
	const getCouponOptions = (coupons: Coupon[]) => {
		return coupons.map((coupon, index) => ({
			key: coupon.code,
			value: index,
			label:
				coupon.name +
				" - " +
				(coupon.discountType === "amount"
					? `${coupon.discountValue}원`
					: `${coupon.discountValue}%`),
		}))
	}

	const getAppliedCouponText = (coupon: Coupon | null) => {
		if (!coupon) return ""
		const discountText =
			coupon.discountType === "amount"
				? `${coupon.discountValue}원`
				: `${coupon.discountValue}%`

		return `적용된 쿠폰: ${coupon.name} (${discountText})`
	}

	return { getCouponOptions, getAppliedCouponText }
}
