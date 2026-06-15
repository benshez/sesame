// vite.config.js
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import vueDevTools from "vite-plugin-vue-devtools";
import Dotenvx from "vite-plugin-dotenvx";

// Vite resolve alias configuration
export default defineConfig({
  envDir: "./environment",
  plugins: [
    Dotenvx({
      // Basic options
      enabled: true,
      verbose: true,
      path: ["./environment/.env.production", "./environment/.env.test", "./environment/.env.development"],
      ignore: ["MISSING_ENV_FILE"],
      envKeysFile: "./environment/.env.keys",
      overload: false,
      convention: "nextjs",

      // Advanced options
      applyInBuild: true, // Apply in build mode as well
      strict: true, // Exit with code 1 if any errors are encountered
      /*ignore: ["MISSING_ENV_FILE"], // Ignore specific errors
      generateExample: true, // Auto-generate .env.example file
      updateGitignore: true, // Auto-add .env.keys to .gitignore
      exposeToClient: ["VITE_._", "PUBLIC_._"], // Expose specific variables to client*/
    }),
    vue(),
    tailwindcss(),
    vueDevTools(),
  ],
  // server: {
  //   port: 3000,
  // },
  build: {
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split all node_modules into separate chunks by package name
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        },
      },
    },
  },  
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "@components": fileURLToPath(new URL("./src/components", import.meta.url)),
      "@pages": fileURLToPath(new URL("./src/pages", import.meta.url)),
      "@api": fileURLToPath(new URL("./src/api", import.meta.url)),
      "@modules": fileURLToPath(new URL("./src/modules", import.meta.url)),
      "@composables": fileURLToPath(new URL("./src/composables", import.meta.url)),
      "@store": fileURLToPath(new URL("./src/store", import.meta.url)),
      "@plugins": fileURLToPath(new URL("./src/plugins", import.meta.url)),
      "@assets": fileURLToPath(new URL("./src/assets", import.meta.url)),
      "@utils": fileURLToPath(new URL("./src/utils", import.meta.url)),
      "@interfaces": fileURLToPath(new URL("./src/interfaces", import.meta.url)),
    },
  },
});
