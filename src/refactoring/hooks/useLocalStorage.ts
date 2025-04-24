// src/hooks/useLocalStorage.ts
import { useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, (val: T | ((prev: T) => T)) => void] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (err) {
			console.error("로컬스토리지 파싱 오류:", err);
			return initialValue;
		}
	});

	const setValue = (value: T | ((prev: T) => T)) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (err) {
			console.error("로컬스토리지 저장 오류:", err);
		}
	};

	return [storedValue, setValue];
}
