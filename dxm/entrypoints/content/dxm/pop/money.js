import $ from "jquery";
import { showToast, waitForElement, sleep, createElementEx, waitForElementWithText } from "../../tool.js";
export function money() {
  function waitForElementWithObserver(selector, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const target = document.body; // 监听整个 body 的 DOM 变化
      const observer = new MutationObserver(() => {
        const el = $(selector)[0];
        if (el) {
          observer.disconnect(); // 找到后停止监听
          resolve(el);
        }
      });

      observer.observe(target, {
        childList: true, // 监听子节点变化
        subtree: true, // 监听整个子树
      });

      // 超时控制
      setTimeout(() => {
        observer.disconnect();
        reject(new Error(`元素 ${selector} 未出现`));
      }, timeout);
    });
  }


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
