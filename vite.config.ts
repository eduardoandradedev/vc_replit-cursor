import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

// 👉 recria __dirname / __filename no contexto ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      "@":       path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared"),
      "@assets": path.resolve(__dirname, "attached_assets")
    }
  },

  // diretório onde ficam os arquivos fonte do front-end
  root: path.resolve(__dirname, "client"),

  // saída do build (Express serve a partir daqui em produção)
  build: {
    outDir:      path.resolve(__dirname, "dist", "public"),
    emptyOutDir: true
  },

  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]   // impede leitura de arquivos ocultos
    }
  }
});
