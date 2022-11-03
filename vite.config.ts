import { defineConfig } from 'vite'

export default defineConfig({
	build: {
		target: 'esnext',
		outDir: './docs',
		assetsDir: './rcs-vending-machine/assets',
	},
})
