import { decrypt, IHF } from './content/tool.js';
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
import { att_select } from './content/dxm/pop/selectColor.js';
import { table } from './content/dxm/pop/table.js';
import { displayWeight } from './content/dxm/pop/weight.js';
import { local_data } from './content/dxm/injected/local_data.js';


import { choiceDisplayWeiht } from './content/dxm/choice/displayWeight.js';
import { choiceMoney } from './content/dxm/choice/money.js';
import { choicePrice } from './content/dxm/choice/price.js';

export default defineContentScript({
  matches: ['*://www.dianxiaomi.com/*'],
  async main() {
    let mm = await browser.runtime.sendMessage({ type: "HAHA" });
    console.log(mm);
    if (decrypt(IHF, mm.draw) !== mm.trt) return
    browser.runtime.sendMessage({ type: "ENABLE_CSS" });
    const url = location.href;
    console.log(url);

    // 获取本地配置
    const data: Record<string, any> = await local_data();

    // 商品管理页面
    if (url.includes('dxmCommodityProduct')) {
      sku();
    }

    // pop & Choice
    if (['smt/edit', 'smt/add', 'smt/FullAndHalfEdit'].some(v => url.includes(v))) {
      console.log(data);
      const skuInfo = data.sku
        .replace(/\r\n/g, "\n")
        .split("\n")
        .filter((line: any) => line.trim() !== "");

      const info = data.config
        .replace(/\r\n/g, "\n")
        .replace(/\r/g, "\n")
        .trim()
        .split("\n")
        .filter((line: any) => line.trim() !== "");
      addItemName();
      adjust_price();
      att(info[0].split(/[:：]/)[1], info[2].split(/[:：]/)[1]);
      deletePic();
      blankSku();
      fill();
      gen();
      money();
      popPrice();
      replaceSku(data.color);
      att_select(skuInfo);
      table();
      displayWeight();

      choiceDisplayWeiht()
      choiceMoney()
      choicePrice()

    }
  },
});
