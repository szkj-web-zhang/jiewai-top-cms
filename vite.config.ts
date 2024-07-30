import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import { envToObjects } from "./src/config/get-env";
import { resolve } from "path";
import { createVitePlugins } from "./src/config/plugins";
import glob from "glob";

const proxy_config = {
  target: "http://192.168.0.99:4399", //陈方俊
  // target: "https://wallet.ylzh.pro", //本地
  ws: false,
  secure: false,
  changeOrigin: true,
  pathRewrite: {}
};

// 获取多入口input配置
const getViteInput = () => {
  let pageEntry = {};
  const allPageEntry: string[] = glob.sync("./src/pages/**/index.html");
  allPageEntry.forEach(item => {
    const pathArr = item.split("/");
    const key = pathArr[pathArr.length - 2];
    // key的-改为_
    const transformKey = pathArr[pathArr.length - 2].replaceAll("-", "_");
    pageEntry[transformKey] = resolve(__dirname, `src/pages/${key}/index.html`);
  });
  return pageEntry;
};

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = envToObjects(env);
  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
        "~": resolve(__dirname, "./src/pages")
      }
    },
    define: {
      "process.env": {}
    },
    server: {
      open: false,
      host: "0.0.0.0",
      proxy: {
        "^/cms-system": proxy_config
      }
    },
    plugins: createVitePlugins(viteEnv),
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    build: {
      outDir: "dist",
      minify: "esbuild", //选择terser去除log和debugger
      sourcemap: false,
      reportCompressedSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        input: {
          index: resolve(__dirname, "index.html"),
          ...getViteInput()
        },
        output: {
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]",
          compact: true,
          manualChunks: (id: string) => {
            if (id.includes("node_modules")) {
              return id
                .toString()
                .split("node_modules/")[1]
                .split("/")[0]
                .toString();
            }
          }
        }
      }
    }
  };
});
