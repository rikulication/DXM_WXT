import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver } from "../../tool.js";

export async function fill() {
    waitForElement("h4.form-card-title", () => {
        async function fill_template() {
            $("#otherInfo .ant-radio-input")[0].click();
            await sleep(100);
            // 服务模板
            $("#templateInfo input#form_item_promiseTemplateId").click();
            await sleep(100);
            $(".rc-virtual-list .in-check-options").click();
            await sleep(100);

            // 欧盟责任人
            $("#otherInfo #form_item_msrEuId").click();
            await sleep(100);
            $(".in-check-options span:contains('Apex CE Specialists GmbH')").click();
            await sleep(100);

            // 品牌制造商
            $("#otherInfo #form_item_manufactureId").click();
            await sleep(100);
            $(
                ".in-check-options span:contains('Wuhan Bosifan Electronic Commerce')"
            ).click();
        }


        try {
            let parentEl = document.querySelector("h4.form-card-title");
            createElementEx("button", {
                className: "mybtn mybtn-info mybtn-sm",
                html: "填充选项",
                myEvent: {
                    click: async function () {
                        fill_template();
                        showToast("请检查运费模板是否有变动", 3000);
                    }
                },
                parent: parentEl,
                insertAdjacent: { target: parentEl, position: "afterend" },
            })
        } catch (error) {
            console.log("一键填充加载失败", error);
        }
    })
}