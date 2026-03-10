import { sku } from './content/dxm/sku/sku.js';
export default defineContentScript({
  matches: ['*://www.dianxiaomi.com/*'],
  main() {
    browser.runtime.sendMessage({ type: "ENABLE_CSS" });

    const url = location.href;

    if (url.includes('dxmCommodityProduct')) {
      sku();
    }

  },
});
