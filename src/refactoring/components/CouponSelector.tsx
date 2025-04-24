import React from "react";
import { Coupon } from "../../types";
import { useCouponOptions } from "../hooks/useCouponOptions";

interface CouponSelectorProps {
	coupons: Coupon[];
	selectedCoupon: Coupon | null;
	applyCoupon: (coupon: Coupon) => void;
}

const CouponSelector: React.FC<CouponSelectorProps> = ({
	coupons,
	selectedCoupon,
	applyCoupon,
}) => {
	const { getCouponOptions, getAppliedCouponText } = useCouponOptions();
	const options = getCouponOptions(coupons);
	const appliedText = getAppliedCouponText(selectedCoupon);

	return (
		<div className="mt-6 bg-white p-4 rounded shadow">
			<h2 className="text-2xl font-semibold mb-2">쿠폰 적용</h2>
			<select
				onChange={(e) => applyCoupon(coupons[parseInt(e.target.value)])}
				className="w-full p-2 border rounded mb-2"
			>
				<option value="">쿠폰 선택</option>
				{options.map((opt) => (
					<option key={opt.key} value={opt.value}>
						{opt.label}
					</option>
				))}
			</select>
			{selectedCoupon && <p className="text-green-600">{appliedText}</p>}
		</div>
	);
};

export default CouponSelector;
