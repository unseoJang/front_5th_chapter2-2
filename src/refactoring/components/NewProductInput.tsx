import React, { Dispatch, SetStateAction } from "react"
import { Product } from "../../types"

interface NewProductInputProps {
	label: string
	id: string
	value: number | string
	type: string
	setNewProduct: Dispatch<SetStateAction<Omit<Product, "id">>>
}

const NewProductInput: React.FC<NewProductInputProps> = ({
	label,
	id,
	value,
	type,
	setNewProduct,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target
		setNewProduct((prev) => ({
			...prev,
			[id]: type === "number" ? Number(value) : value,
		}))
	}

	return (
		<div className="mb-2">
			<label htmlFor={id} className="block text-sm font-medium text-gray-700">
				{label}
			</label>
			<input
				id={id}
				type={type}
				value={value}
				onChange={handleChange}
				className="w-full p-2 border rounded"
			/>
		</div>
	)
}

export default NewProductInput
