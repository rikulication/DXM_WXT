import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";


export function choicePrice() {

  waitForElement(".variant-infornation", () => {

    const units = [
      // "件/个 (piece/pieces)",
      // "包 (pack/packs)",
      // "双 (pair)",
      "袋 (bag/bags)",
      // "桶 (barrel/barrels)",
      "箱 (carton)",
      // "克 (gram)",
      // "升 (liter/liters)",

      // "厘米 (centimeter)",
      // "组合 (combo)",
      // "立方米 (cubic meter)",
      // "打 (dozen)",
      // "英尺 (feet)",
      // "加仑 (gallon)",
      // "英寸 (inch)",
      // "千克 (kilogram)",
      // "千升 (kiloliter)",
      // "千米 (kilometer)",
      // "英吨 (long ton)",
      // "米 (meter)",
      // "公吨 (metric ton)",
      // "毫克 (milligram)",
      // "毫升 (milliliter)",
      // "毫米 (millimeter)",
      // "盎司 (ounce)",
      // "磅 (pound)",
      // "夸脱 (quart)",
      // "套 (set/sets)",
      // "美吨 (short ton)",
      // "平方英尺 (square feet)",
      // "平方英寸 (square inch)",
      // "平方米 (square meter)",
      // "平方码 (square yard)",
      // "吨 (ton)",
      // "码 (yard/yards)"
    ];

    async function sku() {
      let icon = document.querySelectorAll(".iconfont.icon_send.f-blue-imp.pointer.m-left4");
      for (let i = 1; i < icon.length; i++) {
        const el = icon[i];
        el.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("mousemove", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
        el.dispatchEvent(new MouseEvent("mouseout", { bubbles: true }));
      }
      await sleep(500);
      document.querySelectorAll('[data-menu-id="Code"] .ant-dropdown-menu-title-content').forEach((el) => {
        el.dispatchEvent(new MouseEvent("click", { bubbles: true }));
      })
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
      });

      // 批量填充价格按钮
      let tem_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-success jz",
        text: "批量填充价格",
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
        myEvent: {
          click: () => {
            let tr_list = document.querySelectorAll(`.variant-infornation tbody tr`)
            let storageEl_list = []

            for (let el of tr_list) {
              const p_input_list = el.querySelectorAll(`input`)
              const p_input = p_input_list[p_input_list.length - 1]
              storageEl_list.push(p_input)
            }
            setTimeout(() => {
              storageEl_list.forEach((el) => {
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
        myEvent: {
          click: () => {
            sku();
          },
        },
      });

      const copy_sku_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-warning jz",
        text: "复制sku",
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


      const copy_price_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-success jz",
        text: "复制价格",
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
      const fill_num_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-rainbow3 jz",
        text: "填充数量",
        myEvent: {
          click: () => {
            let num = input_box.value.split(/[;；\s]+/).filter(Boolean);
            const num_list = document.querySelectorAll('.variant-infornation input[name="variationGoodsCode"]')

            if (num.length !== num_list.length && num.length !== 1) {
              console.log(num);
              console.log(num.length);

              console.log("两者长度不一样");
              showToast(
                "您填写的数量和页面的对不上，请检查后重新填写",
                3000,
              );
              return;
            }

            for (let i = 0; i < num_list.length; i++) {
              num_list[i].value = num[i] || num[0]
              num_list[i].dispatchEvent(new Event("input", { bubbles: true }))
            }

          },
        }
      })

      const btns = [tem_btn, storage_btn, fill_num_btn]
      const copy_btns = [copy_price_btn, copy_sku_btn, sku_btn]
      const div_title = ['单品单件', '同款多件', '混合套装']
      const title_btn = []
      div_title.forEach((title) => {
        const btn = createElementEx("button", {
          className: "mybtn mybtn-sm mybtn-rainbow jz",
          text: title,
          myEvent: {
            click: async () => {
              const tr_list = document.querySelectorAll('.variant-infornation tbody tr')
              for (let el of tr_list) {
                const p_input = el.querySelector('.ant-select-selector')
                if (!p_input) continue
                p_input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
                await new Promise(r => setTimeout(r, 50))
                $x(`//div[contains(@class,"ant-select-dropdown") and not(contains(@style,"none"))]//div[@title="${title}"]`)[0].dispatchEvent(new MouseEvent("click", { bubbles: true }))
                await new Promise(r => setTimeout(r, 50))
              }
            },
          },
        })

        title_btn.push(btn)
      })


      const po_el = document.querySelector(".variant-infornation")

      const fill_box = createElementEx("div", {
        className: "fill_box distance",
      })
      btns.forEach(btn => fill_box.appendChild(btn))

      const copy_box = createElementEx("div", {
        className: "fill_box distance",
      })
      copy_btns.forEach(btn => copy_box.appendChild(btn))

      const sku_box = createElementEx("div", {
        className: "fill_box distance",
      })

      const unit_box = createElementEx("div", {
        className: "fill_box unit_box",
      })
      const unit_btn_list = []

      for (let u of units) {
        const unit_btn = createElementEx("button", {
          className: "mybtn mybtn-sm mybtn-outline-success jz",
          text: u,
          myEvent: {
            click: async () => {
              const tr_list = document.querySelectorAll('.variant-infornation tbody tr')
              for (let el of tr_list) {
                const p_input = el.querySelectorAll('.ant-select-selector')[1]
                if (!p_input) continue
                p_input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }))
                await new Promise(r => setTimeout(r, 50))
                $x(`//div[contains(@class,"ant-select-dropdown") and not(contains(@style,"none"))]//div[contains(@title,"${u}")]`)[0].dispatchEvent(new MouseEvent("click", { bubbles: true }))
                await new Promise(r => setTimeout(r, 50))
              }

            },
          },
        })
        unit_btn_list.push(unit_btn)
      }
      unit_btn_list.forEach(btn => unit_box.appendChild(btn))


      title_btn.forEach(btn => sku_box.appendChild(btn))
      const main_btn_box = createElementEx("div", {
        className: "grid",
      })

      const btn_box1 = [fill_box, unit_box, copy_box, sku_box]
      btn_box1.forEach(box => main_btn_box.appendChild(box))
      const main_box = [input_box, main_btn_box]
      main_box.forEach(box => po_el.insertAdjacentElement("beforebegin", box))

    } catch (error) {
      console.log("按钮或输入框加载失败:", error);
    }




  });
}
