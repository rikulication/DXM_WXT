import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver } from "../../tool.js";

export async function deletePic() {
    waitForElement("#productProductInfo label[title='产品图片']", async () => {
        try {
            let parent_el = document.querySelector(
                "#productProductInfo .img-module.productMainImgModule .ant-btn.ant-btn-default"
            );
            let count = 0;
            createElementEx("button", {
                className: "mybtn mybtn-danger mybtn-sm",
                html: "删除所有图片",
                myEvent: {
                    click: async () => {
                        let view_more = document.querySelector(".link.view-more");
                        if (view_more) {
                            view_more.click();
                            console.log("点击更多");
                        }
                        await sleep(100);
                        let b = document.querySelectorAll(
                            "#productProductInfo .img-list .iconfont.icon_delete"
                        );
                        try {
                            for (let i of b) {
                                i.click();
                                await sleep(50);
                            }
                        } catch (error) {
                            console.log("删除图片", error);

                        }

                        count++;
                        console.log(`第${count}次删除图片`);
                    }
                },
                insertAdjacent: { target: parent_el, position: "afterend" }
            })
        } catch (error) {
            console.log("一键清除图片加载失败", error);
        }
    })
}