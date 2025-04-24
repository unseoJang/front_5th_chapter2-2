import { Coupon, Product } from "../../types.ts";
import { useCart } from "../hooks";
import { useDiscount } from "../hooks/useDiscount.ts";
import CartList from "./CartList.tsx";
import CouponSelector from "./CouponSelector.tsx";
import OrderSummary from "./OrderSummary.tsx";
import ProductList from "./ProductList.tsx";

interface Props {
	products: Product[];
	coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
	const {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		applyCoupon,
		calculateTotal,
		selectedCoupon,
	} = useCart();

	const { getMaxDiscount } = useDiscount();

	const getRemainingStock = (product: Product) => {
		const cartItem = cart.find((item) => item.product.id === product.id);
		return product.stock - (cartItem?.quantity || 0);
	};

	const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
		calculateTotal();

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">장바구니</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{/* 상품 목록 */}
				<ProductList
					products={products}
					addToCart={addToCart}
					getRemainingStock={getRemainingStock}
					getMaxDiscount={getMaxDiscount}
				/>

				<div>
					<h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
					{/* 장바구니 목록 */}
					<CartList
						cart={cart}
						updateQuantity={updateQuantity}
						removeFromCart={removeFromCart}
					/>

					{/* 쿠폰 적용 및 주문 요약 */}
					<CouponSelector
						coupons={coupons}
						selectedCoupon={selectedCoupon}
						applyCoupon={applyCoupon}
					/>

					{/* 주문 요약 */}
					<OrderSummary
						totalBeforeDiscount={totalBeforeDiscount}
						totalDiscount={totalDiscount}
						totalAfterDiscount={totalAfterDiscount}
					/>
				</div>
			</div>
		</div>
	);
};
