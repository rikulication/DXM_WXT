import { defineConfig } from 'wxt';
import obfuscator from "vite-plugin-javascript-obfuscator";
// See https://wxt.dev/api/config.html
export default defineConfig({
  // vite: () => ({
  //   build: {
  //     minify: "terser",
  //     terserOptions: {
  //       compress: {
  //         drop_console: true,
  //         drop_debugger: true,
  //         pure_funcs: ["console.log"]
  //       },
  //       format: {
  //         comments: false
  //       }
  //     }
  //   },
  //   plugins: [
  //     obfuscator({
  //       // 只混淆 content script，避免 Vue 报错
  //       include: ["entrypoints/content/**/*.ts", "entrypoints/content/**/*.js"],

  //       // 基础混淆
  //       compact: true,                  // 压缩空格
  //       controlFlowFlattening: true,    // 控制流混淆
  //       controlFlowFlatteningThreshold: 0.8, // 混淆强度
  //       deadCodeInjection: true,        // 注入无用代码
  //       debugProtection: true,          // 防调试
  //       disableConsoleOutput: true,     // 删除 console
  //       identifierNamesGenerator: "hexadecimal", // 变量名十六进制
  //       stringArray: true,              // 字符串数组
  //       stringArrayEncoding: ["base64"],// 字符串 base64 加密
  //       stringArrayThreshold: 0.75,     // 混淆比例
  //     })
  //   ]
  // }),
  modules: ['@wxt-dev/module-vue'],

  entrypointsDir: "entrypoints",
  manifest: {
    host_permissions: [
      "*://*.aliexpress.com/*",
      "*://*.dianxiaomi.com/*",
      "https://gitee.com/*"
    ],
    permissions: [
      "storage",
      "tabs",
      "scripting"
    ],
    content_scripts: [
      {
        matches: ["*://*.dianxiaomi.com/*"],
        js: ["dxm.js"]
      }
    ]
  },

});
