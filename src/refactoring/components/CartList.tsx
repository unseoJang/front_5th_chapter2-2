import React from "react"
import { CartItem } from "../../types"
import { useDiscount } from "../hooks/useDiscount"

interface CartListProps {
	cart: CartItem[]
	removeFromCart: (productId: string) => void
	updateQuantity: (productId: string, quantity: number) => void
}

const CartList: React.FC<CartListProps> = ({
	cart,
	updateQuantity,
	removeFromCart,
}) => {
	const { getAppliedDiscount } = useDiscount()

	return (
		<div className="space-y-2">
			{cart.map((item) => {
				const { product, quantity } = item
				const { discounts, id, name, price } = product
				const appliedDiscount = getAppliedDiscount(discounts, quantity)
				return (
					<div
						key={item.product.id}
						className="flex justify-between items-center bg-white p-3 rounded shadow"
					>
						<div>
							<span className="font-semibold">{name}</span>
							<br />
							<span className="text-sm text-gray-600">
								{price.toLocaleString()}원 x {quantity}
								{appliedDiscount > 0 && (
									<span className="text-green-600 ml-1">
										({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
									</span>
								)}
							</span>
						</div>
						<div>
							<button
								onClick={() => updateQuantity(id, quantity - 1)}
								className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
							>
								-
							</button>
							<button
								onClick={() => updateQuantity(id, quantity + 1)}
								className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
							>
								+
							</button>
							<button
								onClick={() => removeFromCart(id)}
								className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
							>
								삭제
							</button>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CartList
