import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";

const env = loadEnv(
    'all',
    process.cwd()
);

console.log(env)

export default defineConfig({
    server: {
        watch: {
            ignored: ['**/_data/**'],
          },
        host: "0.0.0.0",
        hmr: env.VITE_URL
            ? {
                  // Due to port forwarding, we have to replace
                  // 'https' with the forwarded port, as this
                  // is the URI created by GitPod.
                  host: env.VITE_URL.replace(
                    "https://",
                    ""
                ),
                  protocol: "wss",
                  clientPort: 443,
              }
            : {
                  host: "localhost",
              },
    },
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
        }),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ],
    resolve: {
        alias: {
            vue: "vue/dist/vue.esm-bundler.js",
        },
    },
});
