import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, $x } from "../../tool.js";

export async function fill() {
    waitForElement("#productBasicInfo h4.form-card-title", () => {
        async function fill_template() {
            $x(`//div[@id="otherInfo"]//span[text()="不含关税报价"]`)[0].click();
            await sleep(100);
            $x(`//div[@id="templateInfo"]//label[@title="服务模板"]/ancestor::div[contains(@class,"ant-row")]//input`)[0].click();
            await sleep(100);
            $x(`//span[contains(text(),"Service Template for New Sellers")]`)[0].click();
            await sleep(100);
            $x(`//div[@id="otherInfo"]//span[contains(text(),"欧盟责任人")]/ancestor::div[contains(@class,"ant-row")]//input`)[0].click();
            await sleep(100);
            $x(`//span[contains(text(),"Apex CE Specialists GmbH")]`)[0].click();
            await sleep(100);
            $x(`//div[@id="otherInfo"]//label[@title="品牌制造商"]/ancestor::div[contains(@class,"ant-row")]//input`)[0].click();
            await sleep(100);
            $x(`//div[contains(@title,"Wuhan Bosifan Electronic Commerce")]`)[0].click();
        }


        try {
            let parentEl = document.querySelector("#productBasicInfo h4.form-card-title");
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