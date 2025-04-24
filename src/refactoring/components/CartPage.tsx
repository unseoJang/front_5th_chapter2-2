import { useProductContext } from "../contexts/ProductContext"
import { useCouponContext } from "../contexts/CouponContext"
import { useCart } from "../hooks"
import { useDiscount } from "../hooks/useDiscount"
import CartList from "./CartList"
import CouponSelector from "./CouponSelector"
import OrderSummary from "./OrderSummary"
import ProductList from "./ProductList"
import { Product } from "../../types"

export const CartPage = () => {
	const { products } = useProductContext()
	const { coupons } = useCouponContext()
	const {
		cart,
		addToCart,
		removeFromCart,
		updateQuantity,
		applyCoupon,
		calculateTotal,
		selectedCoupon,
	} = useCart()
	const { getMaxDiscount } = useDiscount()

	const getRemainingStock = (product: Product): number => {
		const cartItem = cart.find((item) => item.product.id === product.id)
		return product.stock - (cartItem?.quantity || 0)
	}

	const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
		calculateTotal()

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">장바구니</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<ProductList
					products={products}
					addToCart={addToCart}
					getRemainingStock={getRemainingStock}
					getMaxDiscount={getMaxDiscount}
				/>
				<div>
					<h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
					<CartList
						cart={cart}
						updateQuantity={updateQuantity}
						removeFromCart={removeFromCart}
					/>
					<CouponSelector
						coupons={coupons}
						selectedCoupon={selectedCoupon}
						applyCoupon={applyCoupon}
					/>
					<OrderSummary
						totalBeforeDiscount={totalBeforeDiscount}
						totalDiscount={totalDiscount}
						totalAfterDiscount={totalAfterDiscount}
					/>
				</div>
			</div>
		</div>
	)
}
