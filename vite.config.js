import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          animation: ["gsap", "lenis", "@barba/core"],
          three: ["three"],
          react: ["react", "react-dom"]
        }
      }
    }
  }
});
