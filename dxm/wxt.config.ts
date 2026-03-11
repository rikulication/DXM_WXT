import { defineConfig } from 'wxt';
// See https://wxt.dev/api/config.html
export default defineConfig({

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
