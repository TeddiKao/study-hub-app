import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import path from "path";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@app": path.resolve(__dirname, "./src/app"),
			"@appApi": path.resolve(__dirname, "./src/app/api"),

			"@shared": path.resolve(__dirname, "./src/shared"),
			"@sharedPages": path.resolve(__dirname, "./src/shared/pages"),

			"@auth": path.resolve(__dirname, "./src/features/auth"),
			
			"@shadcnComponents": path.resolve(__dirname, "./src/components")
		}
	}
});
