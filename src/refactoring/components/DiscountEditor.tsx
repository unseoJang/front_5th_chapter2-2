import React from "react";
import { Discount, Product } from "../../types";

interface DiscountEditorProps {
	editingProduct: Product;
	newDiscount: Discount;
	setNewDiscount: (discount: Discount) => void;
	handleRemoveDiscount: (productId: string, discountIndex: number) => void;
	handleAddDiscount: (productId: string) => void;
}

const DiscountEditor: React.FC<DiscountEditorProps> = ({
	editingProduct,
	handleRemoveDiscount,
	newDiscount,
	setNewDiscount,
	handleAddDiscount
}) => {
	const { discounts } = editingProduct;
	return (
		<div>
			<h4 className="text-lg font-semibold mb-2">할인 정보</h4>
			{discounts.map((discount, index) => (
				<div key={index} className="flex justify-between items-center mb-2">
					<span>
						{discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
					</span>
					<button
						onClick={() => handleRemoveDiscount(editingProduct.id, index)}
						className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
					>
						삭제
					</button>
				</div>
			))}
			<div className="flex space-x-2">
				<input
					type="number"
					placeholder="수량"
					value={newDiscount.quantity}
					onChange={(e) =>
						setNewDiscount({
							...newDiscount,
							quantity: parseInt(e.target.value),
						})
					}
					className="w-1/3 p-2 border rounded"
				/>
				<input
					type="number"
					placeholder="할인율 (%)"
					value={newDiscount.rate * 100}
					onChange={(e) =>
						setNewDiscount({
							...newDiscount,
							rate: parseInt(e.target.value) / 100,
						})
					}
					className="w-1/3 p-2 border rounded"
				/>
				<button
					onClick={() => handleAddDiscount(editingProduct.id)}
					className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
				>
					할인 추가
				</button>
			</div>
		</div>
	);
};

export default DiscountEditor;
