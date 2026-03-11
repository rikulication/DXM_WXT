import { decrypt, IHF } from './content/tool.js';
import { adjust_price } from './content/dxm/pop/adjust_price.js';
import { sku } from './content/dxm/sku/sku.js';
import { addItemName } from './content/dxm/pop/addItemName.js';
import { att } from './content/dxm/pop/att.js';
import { deletePic } from './content/dxm/pop/deletePic.js';

export default defineContentScript({
  matches: ['*://www.dianxiaomi.com/*'],
  async main() {
    let mm = await browser.runtime.sendMessage({ type: "HAHA" });
    if (decrypt(IHF, mm.draw) !== mm.trt) return
    browser.runtime.sendMessage({ type: "ENABLE_CSS" });
    const url = location.href;
    // 商品管理页面
    if (url.includes('dxmCommodityProduct')) {
      sku();
    }

    // pop & Choice
    if (['smt/edit', 'smt/add', 'smt/FullAndHalfEdit'].some(v => url.includes(v))) {
      addItemName();
      adjust_price();
      att();
      deletePic();
    }
  },
});
