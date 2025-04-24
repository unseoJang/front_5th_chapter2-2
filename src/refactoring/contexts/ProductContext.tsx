import { createContext, useContext, ReactNode, useState } from "react";
import { Product } from "../../types";

interface ProductContextType {
	products: Product[];
	setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
	addProduct: (product: Product) => void;
	updateProduct: (product: Product) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
	children: ReactNode;
	initialProducts?: Product[];
}

export const ProductProvider = ({
	children,
	initialProducts = [],
}: ProductProviderProps) => {
	const [products, setProducts] = useState<Product[]>(initialProducts);

	const addProduct = (product: Product) => {
		setProducts((prev) => [...prev, product]);
	};

	const updateProduct = (updatedProduct: Product) => {
		setProducts((prev) =>
			prev.map((product) =>
				product.id === updatedProduct.id ? updatedProduct : product
			)
		);
	};

	return (
		<ProductContext.Provider value={{ products, setProducts, addProduct, updateProduct }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);
	if (!context) {
		throw new Error("useProductContext must be used within a ProductProvider");
	}
	return context;
};
