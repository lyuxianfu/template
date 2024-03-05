import {defineConfig, loadEnv} from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import path from "path";
import CreateHtmlPlugin from "./plugin/html-plugin.js";
import BuildPlugin from "./plugin/build-plugin.js";
// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const { VITE_API_DOMAIN } = loadEnv(mode, process.cwd());
  const version =
      new Date().toLocaleDateString("zh") +
      " " +
      new Date().toLocaleTimeString("zh");
  console.log("build version: ", version);
  return {
    plugins: [
      vue(),
      VueSetupExtend(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      CreateHtmlPlugin({
        inject: {
          data: {
            version,
            href: VITE_API_DOMAIN,
          },
        },
      }),
      BuildPlugin(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
    server: {
      open: true,
      host: "0.0.0.0",
      port: 5183,
      proxy: {
        "/api": {
          target: "http://127.0.0.1:3000",
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  };
});
