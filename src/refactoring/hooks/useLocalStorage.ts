import { useState, useEffect } from "react"

export function useLocalStorage<T>(
	key: string,
	initialValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] {
	const isBrowser =
		typeof window !== "undefined" && typeof window.localStorage !== "undefined"

	// 초기값 불러오기
	const getStoredValue = (): T => {
		if (!isBrowser) return initialValue
		try {
			const item = localStorage.getItem(key)
			return item ? (JSON.parse(item) as T) : initialValue
		} catch (error) {
			console.warn(`Error reading localStorage key “${key}”:`, error)
			return initialValue
		}
	}

	const [storedValue, setStoredValue] = useState<T>(getStoredValue)

	// 저장 시 side effect
	useEffect(() => {
		if (!isBrowser) return
		try {
			localStorage.setItem(key, JSON.stringify(storedValue))
		} catch (error) {
			console.warn(`Error setting localStorage key “${key}”:`, error)
		}
	}, [key, storedValue])

	return [storedValue, setStoredValue]
}
