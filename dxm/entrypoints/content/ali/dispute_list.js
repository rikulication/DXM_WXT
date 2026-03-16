
export function dispute_list() {
    function runScript() {
        console.log("[runScript] 正在执行脚本...");
        const boxStyle =
            "color: white; padding: 5px; font-size: large; border-radius: 10px; text-align: center;";

        const rows = document.querySelectorAll(".ait-table-row-level-0");
        if (rows.length === 0) {
            console.log("未找到表格行，延迟重试...");
            return;
        }

        // 清除旧元素，避免重复
        document.querySelectorAll(".price-info, .custom-info-banner").forEach(el => el.remove());

        // 查找重复用户
        function findDuplicates(arr) {
            const countMap = {};
            const result = [];
            arr.forEach(item => {
                countMap[item] = (countMap[item] || 0) + 1;
            });
            for (let key in countMap) {
                if (countMap[key] >= 2) result.push(key);
            }
            return result;
        }

        const highlightColors = [
            "violet", "cornflowerblue", "yellowgreen", "deepskyblue", "orange", "lightcoral", "mediumseagreen"
        ];

        let userList = [];
        document.querySelectorAll(".buyerInfo--trxHVI9c").forEach(i => {
            let userName = i.querySelector(".buyerName--gCC_ijiN a")?.textContent;
            if (userName) userList.push(userName);
        });

        let userRe = findDuplicates(userList);
        const userColorMap = {};
        userRe.forEach((userName, index) => {
            userColorMap[userName] = highlightColors[index % highlightColors.length];
        });

        document.querySelectorAll(".infoItem--Lnv6cmDv").forEach(i => {
            let priceBox = i.querySelector("b");
            if (!priceBox) return;
            let parent = priceBox.parentNode;

            let info = document.createElement("div");
            info.className = "price-info";
            info.style.cssText = boxStyle;

            let country = priceBox.innerText.split(" ")[0];
            let price = parseFloat(priceBox.innerText.replace(/[^\d.]/g, "")) || 0;
            let numText = i.parentNode.parentNode.parentNode.nextElementSibling?.textContent || "";
            let num = parseInt(numText.split("x")[1]) || 1;

            if (country === "CN￥") {
                let usd = (price / 7.19) * num;
                let cny = price * num;
                info.textContent += `$${usd.toFixed(2)} ${usd >= 5 ? "大于或等于5美元" : "小于5美元"}`;
                info.style.cssText += `background-color:${usd >= 5 ? "rgb(230, 104, 58)" : "rgb(138, 205, 70)"};`;
                if (num > 1) info.innerHTML += `<br>￥${cny}`;
            } else {
                let usd = price * num;
                info.textContent += `$${usd} ${usd >= 5 ? "大于或等于5美元" : "小于5美元"}`;
                info.style.cssText += `background-color:${usd >= 5 ? "rgb(230, 104, 58)" : "rgb(138, 205, 70)"};`;
            }

            parent.append(info);

            // 高亮重复用户
            let nameEl = i.parentNode.parentNode.parentNode.previousElementSibling?.querySelector(".buyerName--gCC_ijiN");
            if (nameEl) {
                let userName = nameEl.querySelector("a")?.textContent;
                if (userRe.includes(userName)) {
                    nameEl.style.cssText = `background-color: ${userColorMap[userName]};`;
                }
            }
        });

        // 添加 90 天标记
        for (let i of rows) {
            let span = i.querySelector(".ait-typography");
            if (!span) continue;
            let parent = span.parentNode;

            let targetDateStr = span.innerText.split(" ")[0];
            const parts = targetDateStr.split("-");
            const targetDate = new Date(parts[0], parts[1] - 1, parts[2]);

            const now = new Date();
            now.setHours(0, 0, 0, 0);
            const date90DaysAgo = new Date(now);
            date90DaysAgo.setDate(now.getDate() - 90);

            const y = date90DaysAgo.getFullYear();
            const m = String(date90DaysAgo.getMonth() + 1).padStart(2, "0");
            const d = String(date90DaysAgo.getDate()).padStart(2, "0");
            const date90Str = `${y}-${m}-${d}`;

            let info = document.createElement("div");
            info.className = "custom-info-banner";
            info.innerHTML = `${date90Str} `;
            info.style.cssText = boxStyle;

            if (targetDate < date90DaysAgo) {
                info.innerHTML += "大于90天";
                info.style.cssText += "background-color: #FC6C85;";
            } else if (targetDate > date90DaysAgo) {
                info.innerHTML += "小于90天";
                info.style.cssText += "background-color: #00BFFF;";
            } else {
                info.innerHTML += "刚好是此日期";
                info.style.cssText += "background-color: #FFD700;";
            }

            parent.append(info);
        }
    }

    // DOM监听器
    function observeDOMChanges(callback) {
        const observer = new MutationObserver((mutationsList) => {
            for (let mutation of mutationsList) {
                if (mutation.addedNodes.length > 0) {
                    callback();
                    break;
                }
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    // 防抖逻辑
    let debounceTimer = null;
    function debounceRunScript(delay = 300) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const hasTarget = document.querySelector(".ait-table-row-level-0");
            if (hasTarget) runScript();
        }, delay);
    }

    // 自动启动逻辑
    (function () {
        console.log("[扩展] 正在监控纠纷页面变化...");
        observeDOMChanges(() => debounceRunScript());

        // 定时器兜底（页面没触发 DOM 变化时也能执行）
        setInterval(() => {
            const hasTarget = document.querySelector(".ait-table-row-level-0");
            const hasBanner = document.querySelector(".custom-info-banner");
            if (hasTarget && !hasBanner) {
                console.log("[扩展] 定时器触发 runScript");
                runScript();
            }
        }, 5000);
    })();
}