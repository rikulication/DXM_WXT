import { sku } from './content/dxm/sku/sku.js';
import { decrypt,IHF } from './content/tool.js';
export default defineContentScript({
  matches: ['*://www.dianxiaomi.com/*'],
  async main() {
    let mm = await browser.runtime.sendMessage({ type: "HAHA" });
    if(decrypt(IHF,mm.draw) !== mm.trt) return
    browser.runtime.sendMessage({ type: "ENABLE_CSS" });
    const url = location.href;

    if (url.includes('dxmCommodityProduct')) {
      sku();
    }

  },
});
