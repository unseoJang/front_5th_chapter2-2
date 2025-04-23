interface AdminInputProps {
	label: string;
	value: string | number;
	type: string;
	onChange: (value: string) => void;
}

export const AdminInput: React.FC<AdminInputProps> = ({
	label,
	value,
	type,
	onChange,
}) => {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value);
	};

	return (
		<div className="mb-4">
			<label className="block mb-1">{label}: </label>
			<input
				type={type}
				value={value}
				onChange={handleChange}
				className="w-full p-2 border rounded"
			/>
		</div>
	);
};
