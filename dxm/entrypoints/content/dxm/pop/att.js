import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver } from "../../tool.js";

export function att(userName,brand) {

    function getTodayDateString() {
        const now = new Date();
        let year = now.getFullYear() % 100; // 取后两位年份
        let month = now.getMonth() + 1; // 月份从0开始，要 +1
        let day = now.getDate();
        year = year.toString().padStart(2, "0");
        month = month.toString().padStart(2, "0");
        day = day.toString().padStart(2, "0");
        return year + month + day;
    }

    waitForElement("#attrInfo label[title='自定义属性']", () => {
        try {
            let attKey = '#attrInfo input[placeholder^="属性名"]';
            let attValue = '#attrInfo input[placeholder^="属性值"]';

            let attribute_box = document.querySelector(
                '#attrInfo label[title="自定义属性"]'
            );
            let add_att_btn = document.querySelector(
                "#attrInfo .attr-gray-container .mt-10"
            );
            let p = attribute_box.parentElement;
            p.style.display = "flex";
            p.style.flexDirection = "column";
            // 一、ModelNumber
            createElementEx("button", {
                className: "mybtn mybtn-sm mybtn-info",
                html: "ModelNumber",
                myEvent: {
                    click: (e) => {
                        navigator.clipboard.writeText("ModelNumber").then(() => {
                            showToast(`已复制ModelNumber`);
                        }).catch(err => {
                            console.log("复制失败:", err);
                            showToast("复制失败");
                        });
                    }
                },
                // insertAdjacent: {target:p,position:"afterbegin"}
                parent: p
            })
            //序号
            let num_box = createElementEx("div", {
                className: "num_box",
                parent: p
            }); // 容器
            for (let i = 1; i <= 8; i++) {
                let modelnum = userName + getTodayDateString() + `0${i}` + brand;

                createElementEx("button", {
                    className: "mybtn mybtn-s mybtn-outline-info mleft",
                    text: `M0${i}`,
                    myEvent: {
                        click: () => {
                            navigator.clipboard.writeText(modelnum)
                                .then(() => {
                                    showToast(`已复制${modelnum}`);
                                    console.log("已复制: " + modelnum);
                                })
                                .catch(err => {
                                    console.error("复制失败", err);
                                });
                        },
                    },
                    parent: num_box,
                });
            }

            // 二、自动添加属性
            // 输入框
            let inputBox = createElementEx("textarea", {
                className: "input_att",
                myEvent: {
                    input: (e) => {
                        let el = e.target;
                        el.style.height = "auto";
                        el.style.height = el.scrollHeight + "px";
                    },
                },
                parent: p,
            });

            // 按钮
            createElementEx("button", {
                className: "mybtn mybtn-outline-primary mybtn-sm mytop",
                html: "添加",
                myEvent: {
                    click: async () => {
                        // 清空已有属性
                        let allAtt = document.querySelectorAll(
                            ".smtCustomAttrs .cursor-pointer"
                        );
                        for (let i of allAtt) {
                            i.click();
                            await sleep(20);
                        }

                        // 获取输入框内容
                        let spe = inputBox.value;
                        let lines = spe.split(/\r?\n/).filter((line) => line.trim() !== "");

                        // 逐行添加属性
                        for (let i = 0; i < lines.length; i++) {
                            // 1. 点击添加按钮
                            add_att_btn.click();
                            // 2. 等待新输入框出现
                            await sleep(50);
                            let att_name = document.querySelectorAll(attKey);
                            let att_value = document.querySelectorAll(attValue);
                            // 3. 拿到刚新增的那一对输入框
                            let nameInput = att_name[att_name.length - 1];
                            let valueInput = att_value[att_value.length - 1];
                            // 4. 解析当前行
                            let item = lines[i].split(/[:：]/);
                            let key = (item[0] || "").trim();
                            let val = (item[1] || "").trim();
                            if (key) {
                                nameInput.value = key.charAt(0).toUpperCase() + key.slice(1);
                                nameInput.dispatchEvent(new Event("input", { bubbles: true }));
                            }
                            if (val) {
                                valueInput.value = val.charAt(0).toUpperCase() + val.slice(1);
                                valueInput.dispatchEvent(new Event("input", { bubbles: true }));
                            }
                            // 5. 等下一轮
                            await sleep(50);
                        }
                    },
                },
                parent: p,
            });
            // 三、复制自定义属性
            createElementEx("button", {
                className: "mybtn mybtn-primary mybtn-sm mytop",
                html: "复制自定义属性",
                myEvent: {
                    click: (e) => {
                        let att_name = document.querySelectorAll(attKey)
                        let att_value = document.querySelectorAll(attValue)
                        let custom = Array.from(att_name).map((item, index) => {
                            return `${item.value}: ${att_value[index].value}`;
                        }).join("\n");

                        // 复制到剪贴板
                        navigator.clipboard.writeText(custom).then(() => {
                            showToast("复制自定义属性成功");
                        }).catch(err => {
                            console.log("复制失败:", err);
                            showToast("复制失败");
                        });
                    },
                },
                parent: p
            });

        } catch (error) {
            console.log("自定义属性加载失败", error);
        }

    })

    //   try {
    //     // 一、自动添加属性
    //     let attribute_box = document.querySelector('label[title="自定义属性"]');
    //     let add_att_btn = document.querySelector(".attr-gray-container .mt-10");
    //     let p = attribute_box.parentElement;
    //     p.style.display = "flex";
    //     p.style.flexDirection = "column";

    //     // 创建元素
    //     let input_box = document.createElement("textarea");
    //     let btn = document.createElement("button");

    //     input_box.className = "input_att";
    //     input_box.addEventListener("input", () => {
    //       input_box.style.height = "auto"; // 先清空高度，防止内容减少时不收缩
    //       input_box.style.height = input_box.scrollHeight + "px"; // 根据内容设定新高度
    //     });
    //     btn.className = "mybtn mybtn-outline-primary mybtn-sm mytop";
    //     btn.innerText = "添加";

    //     btn.addEventListener("click", () => {
    //       // let delete_att = document.createElement("button");
    //       // delete_att.className = "mybtn mybtn-danger mybtn-sm";
    //       // delete_att.innerText = "删除所有属性";

    //       let x = document.querySelectorAll(".smtCustomAttrs .cursor-pointer");
    //       for (let i of x) {
    //         setTimeout(() => {
    //           i.click();
    //         }, 500);
    //       }

    //       spe = input_box.value;
    //       let lines = spe.split(/\r?\n/).filter((line) => line.trim() !== "");
    //       for (let i = 0; i < lines.length; i++) {
    //         add_att_btn.click();
    //       }

    //       setTimeout(() => {
    //         let att_name = document.querySelectorAll(
    //           'input[placeholder^="属性名"]'
    //         );
    //         let att_value = document.querySelectorAll(
    //           'input[placeholder^="属性值"]'
    //         );
    //         for (let i = 0; i < lines.length; i++) {
    //           const element = lines[i];
    //           item = element.split(/[:：]/);
    //           att_name[i].value =
    //             item[0].trim().charAt(0).toUpperCase() + item[0].trim().slice(1);
    //           att_value[i].value =
    //             item[1].trim().charAt(0).toUpperCase() + item[1].trim().slice(1);

    //           att_name[i].dispatchEvent(new Event("input", { bubbles: true }));
    //           att_value[i].dispatchEvent(new Event("input", { bubbles: true }));
    //         }
    //       }, 1000);
    //     });

    //     // 复制自定义属性

    //     let custom_btn = document.createElement("button");
    //     // custom_btn.className = "add_att delete";
    //     custom_btn.className = "mybtn mybtn-primary mybtn-sm mytop";
    //     custom_btn.innerHTML = "复制自定义属性";
    //     $(custom_btn).off();
    //     custom_btn.addEventListener("click", () => {
    //       let att_name = document.querySelectorAll('input[placeholder^="属性名"]');
    //       let att_value = document.querySelectorAll('input[placeholder^="属性值"]');
    //       let custom = "";
    //       att_name.forEach((item, index) => {
    //         custom = custom + `${item.value}: ${att_value[index].value}\n`;
    //       });
    //       navigator.clipboard.writeText(custom);
    //       showToast("复制自定义属性成功");
    //     });

    //     // 二、Model Number部分
    //     let num_box = document.createElement("div");
    //     num_box.className = "num_box";

    //     let mn = document.createElement("button");
    //     mn.className = "mybtn mybtn-sm mybtn-info";
    //     mn.innerText = "Model Number";
    //     mn.addEventListener("click", () => {
    //       let txt = "Model Number";
    //       navigator.clipboard.writeText(txt);
    //       showToast(`已复制${txt}`);
    //     });
    //     p.appendChild(mn);
    //     for (let i = 1; i <= 8; i++) {
    //       let num_btn = document.createElement("button");
    //       // num_btn.className = "num_btn";
    //       num_btn.className = "mybtn mybtn-s mybtn-outline-info mleft";
    //       let modelnum = window.n + getTodayDateString() + `0${i}` + window.brand;
    //       num_btn.innerText = `M0${i}`;
    //       num_btn.addEventListener("click", () => {
    //         navigator.clipboard
    //           .writeText(modelnum)
    //           .then(() => {
    //             showToast(`已复制${modelnum}`);
    //             console.log("已复制: " + modelnum);
    //           })
    //           .catch((err) => {
    //             console.error("复制失败", err);
    //           });
    //       });
    //       num_box.appendChild(num_btn);
    //     }
    //     p.appendChild(num_box);
    //     p.appendChild(input_box);
    //     p.appendChild(btn);
    //     p.appendChild(custom_btn);
    //   } catch (error) {
    //     console.log(error);
    //   }
}