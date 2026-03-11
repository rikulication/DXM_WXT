import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText } from "../../tool.js";

export async function color_select(att) {
  waitForElement(".ant-radio-group.ant-radio-group-outline", async () => {
    try {
      // 等待元素出现
      try {
        await waitForElementWithObserver(
          `#productProductInfo span:contains("${att}")`
        );
      } catch (error) {
        console.log(`该分类没有${att}元素`);
        return;
      }

      const color_el = $(`#productProductInfo span:contains("${att}")`)[0]
        .parentNode.parentNode.nextElementSibling;

      const check_box_color = color_el.querySelectorAll(
        ".checkbox-group .checkbox-input"
      );

      const search_box = color_el.querySelector(".search-box");

      // 输入框
      const num_el = createElementEx("input", {
        className: "pppp",
        parent: search_box, // 先添加到 search_box
      });

      // 按钮
      const btn_el = createElementEx("button", {
        className: "mybtn mybtn-s mybtn-outline-primary left2",
        html: "勾选",
        myEvent: {
          click: async () => {
            let num = parseInt(num_el.value, 10);
            if (isNaN(num) || num <= 0) {
              showToast("请输入正确的数量");
              return;
            }
            if (num > check_box_color.length) {
              showToast(`输入的数量超过已有的${att}数量`);
              return;
            }
            for (let i = 0; i < num && i < check_box_color.length; i++) {
              if (check_box_color[i].checked) continue;
              await sleep(50);
              check_box_color[i].click();
            }
          },
        },
        parent: search_box,
        insertAfter: num_el, // 按钮插入在输入框后面
      });

      // 回车触发按钮点击
      num_el.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();   // 阻止表单提交
          btn_el.click();
        }
      });
    } catch (e) {
      console.error(`没有${att}sku`, e);
    }

    async function selectColor() {
      let att_list = window.skuInfo
      for (let i of att_list) {
        color_select(i)
      }
    }
  })

}