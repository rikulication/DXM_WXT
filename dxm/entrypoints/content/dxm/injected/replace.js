import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";


export function replace_description() {

    waitForElement("#sizeRef .ml-10", () => {
        // 使用示例
        (async () => {
            const data = await requestData();
            const shopList = JSON.parse(data.config
                .replace(/\r\n/g, "\n")
                .replace(/\r/g, "\n")
                .trim()
                .split("\n")
                .filter((line) => line.trim() !== "")[1].replace(/'/g, '"')).filter(Boolean)

            const temList = [data.Tem1, data.Tem2, data.Tem3, data.Tem4, data.Tem5];
            const temBtns = []
            const btn_box = createElementEx("div", {
                className: "btn_box",
            })

            shopList.forEach((shopName, index) => {
                let sourceButton = document.querySelector(".cke_button__source");
                const tem_name = temList[index];
                const btn = createElementEx("button", {
                    className: "mybtn mybtn-rainbow2 mybtn-s myleft b",
                    html: shopName + "替换",
                })
                temBtns.push(btn);
                btn.addEventListener("click", async () => {
                    // 源码按钮
                    let sourceButton = document.querySelector(".cke_button__source");
                    if (typeof CKEDITOR !== "undefined") {
                        let ckeId = getCkEditor();
                        let editor = CKEDITOR.instances[ckeId];
                        let html_text = editor.getData();
                        let decription_map = get_description(html_text);
                        console.log(decription_map);

                        let temp = document.createElement("div");
                        temp.innerHTML = tem_name;
                        let description_el = temp.querySelector("#description");
                        let specification_el = temp.querySelector("#specification");
                        let package_included_el = temp.querySelector("#package_included");
                        description_el.innerHTML = "";
                        specification_el.innerHTML = "";
                        package_included_el.innerHTML = "";

                        if (description_el) {
                            description_el.insertAdjacentHTML(
                                "afterbegin",
                                decription_map["description"]
                                    .replace(/\n/g, "<br />")
                                    .replace("<br /><br />", "")
                            );
                        }
                        if (specification_el) {
                            specification_el.insertAdjacentHTML(
                                "afterbegin",
                                decription_map["specification"]
                                    .replace(/\n/g, "<br />")
                                    .replace("<br /><br />", "")
                            );
                        }
                        if (package_included_el) {
                            package_included_el.insertAdjacentHTML(
                                "afterbegin",
                                decription_map["package_included"]
                                    .replace(/\n/g, "<br />")
                                    .replace("<br /><br />", "")
                            );
                        }


                        await sleep(500);
                        if (sourceButton.classList.contains("cke_button_on")) {
                            console.log("源码模式已开启");
                            editor.setData(temp.innerHTML); // 正确方法
                            sourceButton.click(); // 关闭源码模式，回到可视模式（如果需要）
                        } else if (sourceButton.classList.contains("cke_button_off")) {
                            console.log("源码模式未开启");
                            sourceButton.click(); // 先打开源码模式
                            setTimeout(() => {
                                editor.setData(temp.innerHTML); // 设置源码内容
                                sourceButton.click(); // 关闭源码模式，回到可视模式
                            }, 300);
                        } else {
                            console.log("无法判断按钮状态");
                        }
                    } else {
                        showToast("CKEDITOR未加载");
                    }

                });
                btn_box.appendChild(btn);
            });

            let discription_box = document.querySelector("[title='PC端描述']");
            discription_box.insertAdjacentElement("afterend", btn_box);

        })();
    })

}
function requestData() {
    return new Promise((resolve) => {
        const requestId = Date.now(); // 简单生成请求 ID

        function handler(event) {
            if (!event.data || event.data.type !== "RESPONSE_DATA") return;
            if (event.data.requestId !== requestId) return;

            window.removeEventListener("message", handler);
            resolve(event.data.payload);
        }

        window.addEventListener("message", handler);

        // 发送请求
        window.postMessage({
            type: "REQUEST_DATA",
            requestId
        }, "*");
    });
}
function getCkEditor() {
    // 获取父元素
    const parentEl = document.querySelectorAll(
        "#describeInfo .ant-form-item-control-input-content"
    )[1];

    // 找到父元素下面的 textarea
    const textareaEl = parentEl.querySelector("textarea");

    // 获取 id 属性
    const textareaId = textareaEl ? textareaEl.id : null;
    return textareaId;
}

function get_description(html) {
    // 创建临时DOM解析
    let temp = document.createElement("div");
    temp.innerHTML = html;

    // 提取纯文本
    let text = temp.innerText;

    function multiSplit(str, seps) {
        str = str.replace(/\u00A0/g, " "); // NBSP → 普通空格
        let regex = new RegExp(seps.join("|"), "g");
        return str.split(regex).filter(Boolean);
    }
    const str_split = [
        "Description:",
        "Package Included:",
        "Note:",
        "Specifications:",
        "Specification:",
    ]
    console.log(text);

    let result = multiSplit(text, str_split);
    let cleanArr = result.map((s) => s.trim());
    console.log(cleanArr);

    let decription_map = {
        description: cleanArr[1],
        specification: cleanArr[2],
        package_included: cleanArr[3],
    };
    return decription_map;
}