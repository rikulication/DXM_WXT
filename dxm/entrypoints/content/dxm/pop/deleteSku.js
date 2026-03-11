import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver } from "../../tool.js";

export async function blankSku() {
  waitForElement("#productProductInfo label[title='产品图片']", async () => {
    try {
      let p = document.querySelector("#productProductInfo .unit-wrapper");

      createElementEx("button", {
        className: "mybtn mybtn-danger mybtn-sm",
        html: "清空SKU",
        myEvent: {
          click: async () => {
            let check_box = document.querySelectorAll(
              ".checkbox-input.checkbox-span.checked"
            );
            for (let i of check_box) {
              i.click();
              await sleep(50);
            }
          },
        },
        insertAdjacent: { target: p, position: "beforeend" },
      });
    } catch (error) {
      console.log("清除SKU错误", error);
    }
  });
}
