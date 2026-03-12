import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText,$x } from "../../tool.js";

// 替换将sku颜色简写
export async function replaceSku(colour) {
  waitForElement(".ant-radio-group.ant-radio-group-outline", async () => {
    let l = colour.split("\r\n");
    let color_map = {};

    for (let i of l) {
      let item = i.split(/[:：]/);
      let key = item[0];
      let value = item[1];
      color_map[key] = value;
    }

    // 用 createElementEx 创建按钮
    let replace_sku = createElementEx("button", {
      className: "mybtn mybtn-sm mybtn-outline-success mybtn-block block",
      text: "替换所有SKU",
      myEvent: {
        click: () => {
          console.log(color_map);
          let SKU_id_el = document.querySelectorAll('input[placeholder="商品编码"]');
          for (let el of SKU_id_el) {
            let oldVal = el.value;
            let newVal = oldVal;

            for (let [key, value] of Object.entries(color_map)) {
              if (newVal.includes(key)) {
                newVal = newVal.replace(key, value);
              }
            }

            if (newVal !== oldVal) {
              el.value = newVal;
              el.dispatchEvent(new Event("input", { bubbles: true }));
              el.style.transition = "background-color 0.6s";
              el.style.backgroundColor = "#fff3a3"; // 黄色高亮
            }
          }
        }
      }
    });

    // 插入按钮
    let positionEl = $x('//div[@id="productProductInfo"]//span[contains(text(),"批量填充")]/parent::button')[0];
    positionEl.insertAdjacentElement("afterend", replace_sku);
  })

}
