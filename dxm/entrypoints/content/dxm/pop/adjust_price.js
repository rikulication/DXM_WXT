import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver } from "../../tool.js";

export async function adjust_price() {
  waitForElement("#adjustPriceInfo h4", () => {
    try {
      let h4 = document.querySelectorAll("#adjustPriceInfo h4")[0];

      // 创建按钮
      let d_btn = createElementEx("button", {
        className: "mybtn mybtn-s mybtn-outline-primary left2",
        html: "全部取消勾选",
        myEvent: {
          click: async () => {
            let info_item = document.querySelectorAll(
              "#adjustPriceInfo .checkbox-input.checkbox-span"
            );

            // 检查是否有选中的
            let hasChecked = Array.from(info_item).some(el => el.checked);
            if (!hasChecked) return;

            let adjustPriceInfo = document.querySelector(
              "#adjustPriceInfo .ant-checkbox-input"
            );

            if (!adjustPriceInfo) return;

            if (!adjustPriceInfo.checked) {
              adjustPriceInfo.click();
              await sleep(1500);
              adjustPriceInfo.click();
            } else {
              adjustPriceInfo.click();
            }
          }
        }
      });

      h4.insertAdjacentElement("afterend", d_btn);
    } catch (error) {
      console.log("调价区域加载失败", error);
    }

  });
}
