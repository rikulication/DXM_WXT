import { showToast, waitForElement, sleep, createElementEx, waitForElementWithText } from "../../tool.js";
export function money() {

  waitForElementWithText(
    "#productProductInfo .required",
    "零售价",
    function (el) {
      let moneyTable = document.querySelector('#productProductInfo div[class="cur-table"]');
      let currency = "";
      if (el.textContent.includes("CNY")) {
        currency =
          '这是<strong style="color: red;">人民币</strong>店铺，请仔细检查价格计算是否出错';
      } else {
        currency =
          '这是<strong style="color: red;">美元</strong>店铺，请仔细检查价格计算是否出错';
      }
      createElementEx("p", {
        html: currency,
        className: "warn",
        insertAdjacent: { target: moneyTable, position: "beforebegin" },
      });

    }
  );

}
