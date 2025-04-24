import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"
import path from "path"

export default mergeConfig(
	defineConfig({
		plugins: [react()],
		build: {
			rollupOptions: {
				input: {
					main: path.resolve(__dirname, "index.refactoring.html"),
				},
			},
		},
	}),
	defineTestConfig({
		plugins: [react()],
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./src/setupTests.ts",
		},
	})
)
