import { decrypt, IHF } from './content/tool.js';
import { get_config } from './content/config.js';
import { adjust_price } from './content/dxm/pop/adjust_price.js';
import { sku } from './content/dxm/sku/sku.js';
import { addItemName } from './content/dxm/pop/addItemName.js';
import { att } from './content/dxm/pop/att.js';
import { deletePic } from './content/dxm/pop/deletePic.js';
import { blankSku } from './content/dxm/pop/deleteSku.js';
import { fill } from './content/dxm/pop/fill.js';
import { gen } from './content/dxm/pop/genDescription.js';
import { money } from './content/dxm/pop/money.js';
import { popPrice } from './content/dxm/pop/price.js';
import { replaceSku } from './content/dxm/pop/replaceSku.js';
import { color_select } from './content/dxm/pop/selectColor.js';

export default defineContentScript({
  matches: ['*://www.dianxiaomi.com/*'],
  async main() {
    let mm = await browser.runtime.sendMessage({ type: "HAHA" });
    if (decrypt(IHF, mm.draw) !== mm.trt) return
    browser.runtime.sendMessage({ type: "ENABLE_CSS" });
    const url = location.href;
    get_config();
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
      blankSku();
      fill();
      gen();
      money();
      popPrice();
      replaceSku();
      color_select();
    }
  },
});
