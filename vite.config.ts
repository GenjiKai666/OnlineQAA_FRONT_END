import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  root: "./src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // 按照下面的样例写多页面配置的页面入口——就是使用了自己编写的js,css,vue等文件的html文件
        // 没有声明入口，在编译的时候，就不会被编译。
        // 没有声明入口，使用 `npm run dev` 或许能够访问该页面，
        // 但是 `npm run build` 编译打包出来的文件是没有该页面的。
        // 如果使用单文件组件，请也要加入入口页面在这里。

        // 这个是在 'root' 下的index.html ，它是默认设置的入口页面，
        // 这里不写，它也会被编译。
        // 其他 html 页面就没有这个默认设置了。
        index: resolve(__dirname, "src/index.html"),
        // 一个入口页面的配置样例，可以尝试注释它，看看注释前后的 `npm run build` 的执行结果。
        // 浏览器访问的链接是去掉src的部分，即 localhost:port/example/index.html
        gradeManage: resolve(__dirname, "src/teacher/index.html"),
      },
    },
  },
});
