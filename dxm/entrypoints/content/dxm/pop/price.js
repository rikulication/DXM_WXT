import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";

export async function popPrice() {
    waitForElement(".ant-radio-group.ant-radio-group-outline", () => {
        // 折扣计算输入框
        let price_box = createElementEx("textarea", {
            className: "input_att pop_price block",
            placeholder: "输入要计算折扣的价格",
            myEvent: {
                input: (e) => {
                    let el = e.target;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                },
            },
        });

        // 按钮 & 输入框
        let p_btn = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-success jz",
            html: "计算价格",
        });

        let p = createElementEx("input", {
            className: "pppp",
            placeholder: "折扣",
        });

        let fill_box = createElementEx("div", {
            className: "fill_box",
        });
        let tem_btn = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-success jz",
            html: "填充价格",
        });

        let storage_btn = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-success jz",
            html: "填充库存",
        });

        let sku_btn = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-warning jz",
            html: "填充SKU",
        });

        let weight_btn = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-primary jz",
            html: "填充重量",
        });

        let v_btn = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-info jz",
            html: "填充货值",
        });
        // 复制
        let copy_box = createElementEx("div", {
            className: "fill_box",
        });
        let copy_sku = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-outline-warning jz",
            html: "复制SKU",
        });
        let copy_price = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-outline-success jz",
            html: "复制价格",
        });

        let copy_storage = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-outline-success jz",
            html: "复制库存",
        });
        copy_storage.disabled = true;

        let copy_weight = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-outline-primary jz",
            html: "复制重量",
        });
        let size = createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-outline-danger jz",
            html: "引用包装后尺寸",
        });
        let pack = createElementEx('button', {
            className: "mybtn mybtn-sm mybtn-outline-primary jz",
            html: "一键原箱",
        })
        // copy_weight.disabled = true;

        let input_box = createElementEx("textarea", {
            className: "input_att pop_price block",
            myEvent: {
                input: (e) => {
                    let el = e.target;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                },
            },
        });

        // 插入到页面
        let positionEl = document.querySelector(
            ".ant-radio-group.ant-radio-group-outline"
        );
        // 填充按钮组
        [tem_btn, storage_btn, sku_btn, weight_btn, v_btn].forEach((el) => {
            fill_box.appendChild(el);
        });
        // 复制按钮组
        [copy_price, copy_storage, copy_sku, copy_weight, pack, size].forEach((el) => {
            copy_box.appendChild(el);
        });
        // 插入页面
        [price_box, p, p_btn, input_box, fill_box, copy_box]
            .reverse()
            .forEach((el) => {
                positionEl.insertAdjacentElement("afterend", el);
            });
        // ========== 功能逻辑 ==========
        // 原箱
        pack.addEventListener('click',async ()=>{
            let s = $x(`//div[@id="productProductInfo"]//div[@id="skuEditTable"]//thead//option[contains(text(),"请选择")]/parent::select`)[0]
            s.value = "1";
            s.dispatchEvent(new Event("change", { bubbles: true }));
            await sleep(100);
            $x(`//div[@id="productProductInfo"]//div[@id="skuEditTable"]//thead//button/span[contains(text(),"批量填充")]`)[0].click()
        })

        // 应用包装后尺寸
        size.addEventListener('click', () => {
            let l = document.querySelectorAll(`#packageInfo .flex-y-center input`)[0].value
            let w = document.querySelectorAll(`#packageInfo .flex-y-center input`)[1].value
            let h = document.querySelectorAll(`#packageInfo .flex-y-center input`)[2].value
            let len_list = document.querySelectorAll(`tbody input[placeholder="长"]`)
            let wid_list = document.querySelectorAll(`tbody input[placeholder="宽"]`)
            let height_list = document.querySelectorAll(`tbody input[placeholder="高"]`)
            len_list.forEach((el) => {
                el.value = l
                el.dispatchEvent(new Event("input", { bubbles: true }));

            })
            wid_list.forEach((el) => {
                el.value = w
                el.dispatchEvent(new Event("input", { bubbles: true }));
            })
            height_list.forEach((el) => {
                el.value = h
                el.dispatchEvent(new Event("input", { bubbles: true }));
            })
        })

        // 复制重量
        copy_weight.addEventListener('click', () => {
            let weight_list = Array.from(document.querySelectorAll(
                'tbody input[placeholder="重量"]'
            )).map(el => el.value * 1000).join("\n")
            console.log(weight_list);

            navigator.clipboard
                .writeText(weight_list)
                .then(() => {
                    showToast(`已复制`);
                })
                .catch((err) => {
                    console.log("复制失败:", err);
                    showToast("复制失败");
                });
        })

        // 货值填充
        v_btn.addEventListener('click', () => {
            let weight = input_box.value.split(/[;；\s]+/);
            let weightEl_list = document.querySelectorAll(
                `tbody input[placeholder="货值"]`
            );
            let weight_list = weight.filter(Boolean);
            console.log(weight_list);
            if (weightEl_list.length != weight_list.length) {
                console.log("两者长度不一样");
                showToast("您填写的货值数量和页面的价格框对不上，请检查后重新填写", 3000);
                return;
            }

            weightEl_list.forEach((el, index) => {
                el.value = weight_list[index]
                el.dispatchEvent(new Event("input", { bubbles: true }));
            });
        })

        // 复制价格逻辑
        copy_price.addEventListener("click", () => {
            let price_list = Array.from(document.querySelectorAll(
                'tbody input[placeholder="零售价"]'
            )).map(el => el.value).join("\n")
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
        });

        //复制sku逻辑
        copy_sku.addEventListener("click", () => {
            let sku_list = Array.from(
                document.querySelectorAll('input[placeholder="商品编码"]')
            )
                .map((el) => el.value)
                .join("\n");
            console.log(sku_list);

            navigator.clipboard
                .writeText(sku_list)
                .then(() => {
                    showToast(`已复制`);
                })
                .catch((err) => {
                    console.log("复制失败:", err);
                    showToast("复制失败");
                });
        });

        // 重量填充
        weight_btn.addEventListener("click", () => {
            let weight = input_box.value.split(/[;；\s]+/);
            let weightEl_list = document.querySelectorAll(
                `tbody input[placeholder="重量"]`
            );
            let weight_list = weight.filter(Boolean);
            console.log(weight_list);
            if (weightEl_list.length != weight_list.length) {
                console.log("两者长度不一样");
                showToast("您填写的重量数量和页面的价格框对不上，请检查后重新填写", 3000);
                return;
            }

            weightEl_list.forEach((el, index) => {
                el.value = weight_list[index] / 1000;
                el.dispatchEvent(new Event("input", { bubbles: true }));
            });
        });

        // 价格填充
        tem_btn.addEventListener("click", () => {
            let price = input_box.value.split(/[;；\s]+/);
            let priceEl_list = document.querySelectorAll(
                'tbody input[placeholder="零售价"]'
            );
            let price_list = price.filter(Boolean);
            console.log(price_list);

            if (priceEl_list.length != price_list.length) {
                console.log("两者长度不一样");
                showToast("您填写的价格数量和页面的价格框对不上，请检查后重新填写", 3000);
                return;
            }

            for (let i of price_list) {
                if (i.toLowerCase().includes("cny")) {
                    showToast("请检查是否填写成原价", 3000);
                    return;
                }
            }

            // setTimeout(() => {
            priceEl_list.forEach(async (el, index) => {
                el.value = price_list[index];
                el.dispatchEvent(new Event("input", { bubbles: true }));
                await sleep(200);
            });
            // }, 100);
        });

        // 库存填充
        storage_btn.addEventListener("click", () => {
            let weight_list = document.querySelectorAll(
                'tbody input[placeholder="库存"]'
            );
            let weight = Math.floor(Math.random() * (10000 - 6001)) + 6001;
            weight_list.forEach((el) => {
                el.value = weight;
                el.dispatchEvent(new Event("input", { bubbles: true }));
            });
        });

        // SKU填充
        sku_btn.addEventListener("click", () => {
            // 页面上的 SKU 输入框
            let SKU_id_el = document.querySelectorAll('input[placeholder="商品编码"]');

            // 用户输入内容（支持 ; 、；、空格、换行）
            let sku_list = input_box.value.split(/[;；\s]+/).filter(Boolean);
            console.log(sku_list);

            // 数量不一致提示
            if (SKU_id_el.length !== sku_list.length) {
                console.log("SKU 填写数量与页面不一致");
                showToast(
                    "您填写的 SKU 数量和页面商品编码框数量不一致，请检查后重新填写",
                    3000
                );
                return;
            }

            // 禁止出现中文或特殊符号（可按需要调整）
            for (let sku of sku_list) {
                if (/[\u4e00-\u9fa5]/.test(sku)) {
                    showToast("SKU 中不能出现中文，请检查", 3000);
                    return;
                }
            }

            // 延时逐个写入（保持与价格一致）
            SKU_id_el.forEach(async (el, index) => {
                el.value = sku_list[index];
                el.dispatchEvent(new Event("input", { bubbles: true }));
                await sleep(200); // 避免触发太快
            });
        });

        // 折扣计算
        function aaa() {
            let discount = 1 - parseFloat(p.value) / 100; // 折扣率
            let p_list = price_box.value.split(/[;；\s]+/).filter(Boolean);
            let new_p = [];

            p_list.forEach((el) => {
                let price = parseFloat(el);
                let original = price / discount;
                new_p.push(original.toFixed(2));
            });

            console.log(new_p);
            let price_str = new_p.join("；");
            console.log(price_str);

            input_box.value = price_str;
        }

        // 回车触发
        p.addEventListener("keydown", function (e) {
            if (e.key === "Enter") {
                e.preventDefault();
                aaa();
            }
        });

        // 点击按钮触发
        p_btn.addEventListener("click", () => {
            aaa();
        });
    });
}
