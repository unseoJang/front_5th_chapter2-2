import { defineConfig as defineTestConfig, mergeConfig } from "vitest/config"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react-swc"
import { resolve } from "path"

const mode = process.env.NODE_ENV || "development"
const env = loadEnv(mode, process.cwd(), "")

export default mergeConfig(
	defineConfig({
		base: env.VITE_BASE_PATH,
		plugins: [react()],
		build: {
			rollupOptions: {
				input: {
					main: resolve(__dirname, "index.refactoring.html"),
				},
			},
		},
	}),
	defineTestConfig({
		test: {
			globals: true,
			environment: "jsdom",
			setupFiles: "./src/setupTests.ts",
		},
	})
)
