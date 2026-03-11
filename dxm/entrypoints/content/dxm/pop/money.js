import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText } from "../../tool.js";
import $ from "jquery";
export function money() {
  waitForElementWithText(
    "#productProductInfo .required",
    "零售价",
    function (el) {
      let moneyTable = $('#productProductInfo div[class="cur-table"]');
      let currency = "";
      if (el.textContent.includes("CNY")) {
        currency =
          '这是<strong style="color: red;">人民币</strong>店铺，请仔细检查价格计算是否出错';
        console.log("人民币店铺");
      } else {
        currency =
          '这是<strong style="color: red;">美元</strong>店铺，请仔细检查价格计算是否出错';
      }
      createElementEx("p", {
        html: currency,
        className: "warn",
        insertAdjacent: { target: moneyTable[0], position: "beforebegin" },
      });
      console.log("找到元素:", el);
      console.log("文本内容:", el.textContent.trim());
    }
  );

}
