import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";

export function choiceDisplayWeiht() {
  const units = [
    "袋 (bag/bags)",
    "桶 (barrel/barrels)",
    "蒲式耳 (bushel/bushels)",
    "箱 (carton)",
    "厘米 (centimeter)",
    "组合 (combo)",
    "立方米 (cubic meter)",
    "打 (dozen)",
    "英尺 (feet)",
    "加仑 (gallon)",
    "克 (gram)",
    "英寸 (inch)",
    "千克 (kilogram)",
    "千升 (kiloliter)",
    "千米 (kilometer)",
    "升 (liter/liters)",
    "英吨 (long ton)",
    "米 (meter)",
    "公吨 (metric ton)",
    "毫克 (milligram)",
    "毫升 (milliliter)",
    "毫米 (millimeter)",
    "盎司 (ounce)",
    "双 (pair)",
    "包 (pack/packs)",
    "件/个 (piece/pieces)",
    "磅 (pound)",
    "夸脱 (quart)",
    "套 (set/sets)",
    "美吨 (short ton)",
    "平方英尺 (square feet)",
    "平方英寸 (square inch)",
    "平方米 (square meter)",
    "平方码 (square yard)",
    "吨 (ton)",
    "码 (yard/yards)"
  ];

  waitForElement('div.product-infornation input.ant-input.input-number[placeholder="请输入"]', () => {
    try {
      console.log("半托管重量加载成功");

      let weight_list = document.querySelectorAll(
        'div.product-infornation input.ant-input.input-number[placeholder="请输入"]'
      );

      weight_list.forEach((item) => {
        // 父元素设置为 inline-flex
        item.parentNode.style.display = "inline-flex";
        item.parentNode.style.alignItems = "center";

        // 输入框宽度
        item.style.width = "100px";

        // 克数显示
        let span_el = createElementEx("span", {
          style: { display: "inline", color: "red", marginLeft: "4px" },
          text: `${item.value * 1000}g`,
          insertAfter: item,
        });

        // 输入事件监听，实时更新克数
        item.addEventListener("input", () => {
          span_el.innerText = `${item.value * 1000}g`;
        });
      });
    } catch (error) {
      console.log("半托管重量加载失败", error);
    }
  });
}
