// contexts/CouponContext.tsx
import { createContext, useContext } from "react";
import { useCoupons } from "../hooks";
import { Coupon } from "../../types";

interface CouponContextType {
	coupons: Coupon[];
	addCoupon: (newCoupon: Coupon) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

interface CouponProviderProps {
	children: React.ReactNode;
	initialCoupons?: Coupon[];
}

export const CouponProvider = ({
	children,
	initialCoupons = [],
}: CouponProviderProps) => {
	const { coupons, addCoupon } = useCoupons(initialCoupons);

	return (
		<CouponContext.Provider value={{ coupons, addCoupon }}>
			{children}
		</CouponContext.Provider>
	);
};

export const useCouponContext = () => {
	const context = useContext(CouponContext);
	if (!context) {
		throw new Error("useCouponContext must be used within a CouponProvider");
	}
	return context;
};
