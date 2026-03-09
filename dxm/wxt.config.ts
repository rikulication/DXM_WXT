import { defineConfig } from 'wxt';
import content from './entrypoints/content/content';

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ['@wxt-dev/module-vue'],
  
  entrypointsDir: "entrypoints/content",
  manifest: {
    host_permissions: [
      "*://*.aliexpress.com/*",
      "*://*.dianxiaomi.com/*"
    ],
    permissions: [
      "storage",
      "tabs",
      "scripting"
    ]
  }
});
