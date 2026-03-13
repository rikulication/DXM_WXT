import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";


export function choiceWeight() {
  waitForElement(`h4.form-card-title.flex-y-center`, () => {
    
    try {
      let weight_text = `<p>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp n<100，小于<span style="color: red;">16g</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp 100<=n<=300，小于<span style="color: red;">33g</span>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp n>=300，小于<span style="color: red;">50g</span></p>`;
      let country = document.querySelector(".country-list");
      let weight_parent = document.querySelector(
        "h4.form-card-title.flex-y-center"
      );

      if (!country || !weight_parent) {
        console.log("未找到 country 或 weight_parent 元素");
        return;
      }
      // 提示文字
      let p = createElementEx("p", {
        html: weight_text,
        insertAdjacent: { target: weight_parent, position: "beforeend" },
      });

      // // 重量选择器
      // let w = createElementEx("input", {
      //   className: "wwww",
      //   insertAdjacent: { target: weight_parent, position: "beforeend" },
      // });

      // 填写重量框
      let input_box = createElementEx("textarea", {
        className: "weight_input",
        insertAdjacent: { target: country, position: "afterend" },
      });

      // 修改重量按钮
      let weight_btn = createElementEx("button", {
        className: "mybtn mybtn-sm mybtn-primary jz",
        text: "修改重量",
        insertAdjacent: { target: weight_parent, position: "beforeend" },
        myEvent: {
          click: () => {
            let weight_list = input_box.value.split(/[;；\s]+/).filter(Boolean).map(v => v.replace(/[a-zA-Z]/g, ''));
            // let w_info = w.value;
            // let weightEl_list = document.querySelectorAll(
            //   `input[placeholder="请输入"][value="${w_info}"]`
            // );
            let weightEl_list = $x(`//div[@class="form-card-content"]//tbody/tr/td[ count( ancestor::table//thead//th[ .//p[contains(normalize-space(), "重量")] ]/preceding-sibling::th ) + 1 ]//input`)

            if (weightEl_list.length !== weight_list.length) {
              console.log("两者长度不一样");
              showToast(
                "您填写的重量数量和页面的填写框对不上，请检查后重新填写",
                3000
              );
              return;
            }
            setTimeout(() => {
              weightEl_list.forEach((el, index) => {
                el.value = weight_list[index] / 1000; // 转换为 kg
                el.dispatchEvent(new Event("input", { bubbles: true }));
              });
            }, 500);
          },
          
        },
      });
    } catch (error) {
      console.log("修改重量加载失败", error);
    }
  })
}
