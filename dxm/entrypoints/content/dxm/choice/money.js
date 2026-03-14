import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";

export function choiceMoney() {
  // 使用示例
  waitForElementWithText("span", "产品价格", function () {
    setTimeout(function () {
      let el = $x('//span[contains(text(), "产品价格")]')[0]
      let moneyTable = $x(`//div[@class="variant-infornation"]`);
      let currency = "";
      if (el.textContent.includes("CNY")) {
        currency =
          '这是<strong style="color: red;">人民币</strong>店铺，请仔细检查价格计算是否出错<br><strong style="color: red;">注意预留折扣</strong>';
      } else if (el.textContent.includes("USD")) {
        currency =
          '这是<strong style="color: red;">美元</strong>店铺，请仔细检查价格计算是否出错<br><strong style="color: red;">注意预留折扣</strong>';
      }
      createElementEx("p", {
        html: currency,
        className: "warn",
        insertAdjacent: { target: moneyTable[0], position: "beforebegin" },
      });

    }, 3000);
  });
}
// function waitForElement(selector, callback) {
//   const observer = new MutationObserver(() => {
//     const el = document.querySelector(selector);
//     if (el) {
//       observer.disconnect(); // 找到后停止监听
//       callback(el);
//     }
//   });

//   observer.observe(document.body, {
//     childList: true,
//     subtree: true,
//   });
// }

// waitForElement('.variant-infornation',(el)=>{
//     let p = $('span:contains("产品价格")')[0]
//     console.log(p);

//     let currency = "";
//     if (p.textContent.includes("CNY")) {
//       currency =
//         '这是<strong style="color: red;">人民币</strong>店铺，请仔细检查价格计算是否出错';
//       console.log("人民币店铺");
//     } else if ((p.textContent.includes("USD"))) {

//       currency =
//         '这是<strong style="color: red;">美元</strong>店铺，请仔细检查价格计算是否出错';
//     }
//     createElementEx("p", {
//       html: currency,
//       className: "warn",
//       insertAdjacent: { target: el, position: "beforebegin" },
//     });
// })
