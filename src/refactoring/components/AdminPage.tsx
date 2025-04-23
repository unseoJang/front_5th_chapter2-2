import { useState } from "react";
import { Coupon, Discount, Product } from "../../types.ts";
import NewProductInput from "./NewProductInput.tsx";
import { AdminInput } from "./AdminInput.tsx";
import DiscountEditor from "./DiscountEditor.tsx";
import CouponAdmin from "./CouponAdmin.tsx";

interface Props {
	products: Product[];
	coupons: Coupon[];
	onProductUpdate: (updatedProduct: Product) => void;
	onProductAdd: (newProduct: Product) => void;
	onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
	products,
	coupons,
	onProductUpdate,
	onProductAdd,
	onCouponAdd,
}: Props) => {
	const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const [newDiscount, setNewDiscount] = useState<Discount>({
		quantity: 0,
		rate: 0,
	});
	const [newCoupon, setNewCoupon] = useState<Coupon>({
		name: "",
		code: "",
		discountType: "percentage",
		discountValue: 0,
	});
	const [showNewProductForm, setShowNewProductForm] = useState(false);
	const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
		name: "",
		price: 0,
		stock: 0,
		discounts: [],
	});

	const toggleProductAccordion = (productId: string) => {
		setOpenProductIds((prev) => {
			const newSet = new Set(prev);
			if (newSet.has(productId)) {
				newSet.delete(productId);
			} else {
				newSet.add(productId);
			}
			return newSet;
		});
	};

	// handleEditProduct 함수 수정
	const handleEditProduct = (product: Product) => {
		setEditingProduct({ ...product });
	};

	// 새로운 핸들러 함수 추가
	const handleProductNameUpdate = (productId: string, newName: string) => {
		if (editingProduct && editingProduct.id === productId) {
			const updatedProduct = { ...editingProduct, name: newName };
			setEditingProduct(updatedProduct);
		}
	};

	// 새로운 핸들러 함수 추가
	const handlePriceUpdate = (productId: string, newPrice: number) => {
		if (editingProduct && editingProduct.id === productId) {
			const updatedProduct = { ...editingProduct, price: newPrice };
			setEditingProduct(updatedProduct);
		}
	};

	// 수정 완료 핸들러 함수 추가
	const handleEditComplete = () => {
		if (editingProduct) {
			onProductUpdate(editingProduct);
			setEditingProduct(null);
		}
	};

	const handleStockUpdate = (productId: string, newStock: number) => {
		const updatedProduct = products.find((p) => p.id === productId);
		if (updatedProduct) {
			const newProduct = { ...updatedProduct, stock: newStock };
			onProductUpdate(newProduct);
			setEditingProduct(newProduct);
		}
	};

	const handleAddDiscount = (productId: string) => {
		const updatedProduct = products.find((p) => p.id === productId);
		if (updatedProduct && editingProduct) {
			const newProduct = {
				...updatedProduct,
				discounts: [...updatedProduct.discounts, newDiscount],
			};
			onProductUpdate(newProduct);
			setEditingProduct(newProduct);
			setNewDiscount({ quantity: 0, rate: 0 });
		}
	};

	const handleRemoveDiscount = (productId: string, index: number) => {
		const updatedProduct = products.find((p) => p.id === productId);
		if (updatedProduct) {
			const newProduct = {
				...updatedProduct,
				discounts: updatedProduct.discounts.filter((_, i) => i !== index),
			};
			onProductUpdate(newProduct);
			setEditingProduct(newProduct);
		}
	};

	const handleAddCoupon = (coupon: Coupon) => {
		onCouponAdd(coupon);
	};

	const handleAddNewProduct = () => {
		const productWithId = { ...newProduct, id: Date.now().toString() };
		onProductAdd(productWithId);
		setNewProduct({
			name: "",
			price: 0,
			stock: 0,
			discounts: [],
		});
		setShowNewProductForm(false);
	};

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div>
					<h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
					<button
						onClick={() => setShowNewProductForm(!showNewProductForm)}
						className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
					>
						{showNewProductForm ? "취소" : "새 상품 추가"}
					</button>
					{showNewProductForm && (
						<div className="bg-white p-4 rounded shadow mb-4">
							<h3 className="text-xl font-semibold mb-2">새 상품 추가</h3>

							<NewProductInput
								label="상품명"
								id="name" // ✅ 이게 핵심
								type="text"
								value={newProduct.name}
								setNewProduct={setNewProduct}
							/>
							<NewProductInput
								label="가격"
								id="price"
								type="number"
								value={newProduct.price}
								setNewProduct={setNewProduct}
							/>
							<NewProductInput
								label="재고"
								id="stock"
								type="number"
								value={newProduct.stock}
								setNewProduct={setNewProduct}
							/>

							<button
								onClick={handleAddNewProduct}
								className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
							>
								추가
							</button>
						</div>
					)}
					<div className="space-y-2">
						{products.map((product, index) => (
							<div
								key={product.id}
								data-testid={`product-${index + 1}`}
								className="bg-white p-4 rounded shadow"
							>
								<button
									data-testid="toggle-button"
									onClick={() => toggleProductAccordion(product.id)}
									className="w-full text-left font-semibold"
								>
									{product.name} - {product.price}원 (재고: {product.stock})
								</button>
								{openProductIds.has(product.id) && (
									<div className="mt-2">
										{editingProduct && editingProduct.id === product.id ? (
											<div>
												<AdminInput
													label="상품명"
													value={editingProduct.name}
													type="text"
													onChange={(value) =>
														handleProductNameUpdate(product.id, value)
													}
												/>

												<AdminInput
													label="가격"
													value={editingProduct.price}
													type="number"
													onChange={(value) =>
														handlePriceUpdate(product.id, parseInt(value))
													}
												/>

												<AdminInput
													label="재고"
													value={editingProduct.stock}
													type="number"
													onChange={(value) =>
														handleStockUpdate(product.id, parseInt(value))
													}
												/>
												{/* 할인 정보 수정 부분 */}
												<DiscountEditor
													editingProduct={editingProduct}
													newDiscount={newDiscount}
													setNewDiscount={setNewDiscount}
													handleRemoveDiscount={() =>
														handleRemoveDiscount(product.id, index)
													}
													handleAddDiscount={() =>
														handleAddDiscount(product.id)
													}
												/>
												<button
													onClick={handleEditComplete}
													className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
												>
													수정 완료
												</button>
											</div>
										) : (
											<div>
												{product.discounts.map((discount, index) => (
													<div key={index} className="mb-2">
														<span>
															{discount.quantity}개 이상 구매 시{" "}
															{discount.rate * 100}% 할인
														</span>
													</div>
												))}
												<button
													data-testid="modify-button"
													onClick={() => handleEditProduct(product)}
													className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
												>
													수정
												</button>
											</div>
										)}
									</div>
								)}
							</div>
						))}
					</div>
				</div>
				{/* 쿠폰 관리 부분 */}
				<CouponAdmin handleAddCoupon={handleAddCoupon} coupons={coupons} />
			</div>
		</div>
	);
};
