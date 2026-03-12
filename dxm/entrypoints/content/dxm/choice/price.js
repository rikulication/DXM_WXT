import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";


export function choicePrice() {
  waitForElement(".variant-infornation", () => {
    async function sku() {
      let icon = $(".iconfont.icon_send.f-blue-imp.pointer.m-left4");
      for (let i = 1; i < icon.length; i++) {
        const el = icon[i];
        el.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
      }
      await sleep(500);
      $('[data-menu-id="Code"] .ant-dropdown-menu-title-content').click();
    }
    try {
      let positionEl = document.querySelector(".variant-infornation")
        ?.parentElement?.parentElement;
      if (!positionEl) {
        console.warn("未找到 .variant-infornation");
        return;
      }

      // 输入框（自动伸缩高度）
      let input_box = createElementEx("textarea", {
        className: "input_att block choiceInput",
        // style: { resize: "none", overflow: "hidden" },
        myEvent: {
          input: (e) => {
            let el = e.target;
            el.style.height = "auto";
            el.style.height = el.scrollHeight + "px";
          },
        },
        insertAdjacent: { target: positionEl, position: "beforebegin" },
      });

      // 批量填充价格按钮
      let tem_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-success jz",
        text: "批量填充价格",
        insertAdjacent: { target: positionEl, position: "beforebegin" },
        myEvent: {
          click: () => {
            let price = input_box.value.split(/[;；\s]+/).filter(Boolean);
            let tr_list = document.querySelectorAll(`.variant-infornation tbody tr`)
            let priceEl_list = []

            for (let el of tr_list) {
              const p_input = el.querySelector(`input`)
              priceEl_list.push(p_input)
            }


            if (priceEl_list.length !== price.length) {
              console.log("两者长度不一样");
              showToast(
                "您填写的价格数量和页面的价格框对不上，请检查后重新填写",
                3000,
              );
              return;
            }

            for (let i of price) {
              if (i.toLowerCase().includes("cny")) {
                showToast("请检查是否填写成原价", 3000);
                return;
              }
            }

            setTimeout(() => {
              priceEl_list.forEach((el, index) => {
                el.value = price[index];
                el.dispatchEvent(new Event("input", { bubbles: true }));
              });
            }, 500);
          },
        },
      });

      // 填充虚拟库存按钮
      let storage_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-info jz",
        text: "填充虚拟库存",
        insertAdjacent: { target: positionEl, position: "beforebegin" },
        myEvent: {
          click: () => {
            let weight_list = document.querySelectorAll(
              `//div[@class="variant-infornation"]//tbody/tr/td[count(ancestor::table//thead//th[.//span[normalize-space()="产品价格"]]/preceding-sibling::th)+2]//input`,
            );
            setTimeout(() => {
              weight_list.forEach((el) => {
                el.value = 999;
                el.dispatchEvent(new Event("input", { bubbles: true }));
              });
            });
          },
        },
      });

      // 一键引用SKU按钮
      let sku_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-primary jz",
        text: "一键引用sku",
        insertAdjacent: { target: positionEl, position: "beforebegin" },
        myEvent: {
          click: () => {
            sku();
          },
        },
      });

      createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-warning jz",
        text: "复制sku",
        insertAdjacent: { target: positionEl, position: "beforebegin" },
        myEvent: {
          click: () => {
            let price_list = Array.from($x(`//div[@class="variant-infornation"]//tbody/tr/td[
  count(
    ancestor::table//thead//th[
      .//span[normalize-space()="SKU编码"]
    ]/preceding-sibling::th
  ) + 1
]
`)).map(el => el.querySelector('input').value).join("\n")
            console.log(price_list);
            navigator.clipboard
              .writeText(price_list)
              .then(() => {
                showToast(`已复制`);
              })
              .catch((err) => {
                console.log("复制失败:", err);
                showToast("复制失败");
              });
          },
        },
      });


      createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-success jz",
        text: "复制价格",
        insertAdjacent: { target: positionEl, position: "beforebegin" },
        myEvent: {
          click: () => {
            let tr_list = document.querySelectorAll(`.variant-infornation tbody tr`)
            let priceEl_list = []

            for (let el of tr_list) {
              const p_input = el.querySelector(`input`)
              priceEl_list.push(p_input)
            }
            let price_list = Array.from(priceEl_list).map(el => el.value).join("\n")
            console.log(price_list);
            navigator.clipboard
              .writeText(price_list)
              .then(() => {
                showToast(`已复制`);
              })
              .catch((err) => {
                console.log("复制失败:", err);
                showToast("复制失败");
              });

          },
        },
      });
    } catch (error) {
      console.log("按钮或输入框加载失败:", error);
    }




  });
}
