import $ from "jquery";

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


/**
 * 通用创建元素函数
 * @param {string} tagName - 元素标签名，例如 'button'、'input'、'div'
 * @param {Object} options - 可选配置
 *   - className {string} 元素类名
 *   - text {string} 元素的文本内容
 *   - html {string} 元素的 innerHTML（和 text 互斥，优先 text）
 *   - attrs {Object} 属性集合，例如 { id: "btn1", type: "checkbox" }
 *   - style {Object} 样式集合，例如 { color: "red", margin: "5px" }
 *   - myEvent {Object} 事件绑定，例如 { click: handler, change: fn }
 *   - parent {HTMLElement} 父节点，若传入则会 appendChild
 *   - insertAfter {HTMLElement} 参考节点，插在它后面
 *   - insertBefore {HTMLElement} 参考节点，插在它前面
 *   - insertAdjacent {Object} 使用 insertAdjacentElement 插入
 *        { target: HTMLElement, position: "beforebegin"|"afterbegin"|"beforeend"|"afterend" }
 * @returns {HTMLElement} 创建好的元素
 */
export function createElementEx(tagName, options = {}) {
  const el = document.createElement(tagName);

  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;
  if (options.html) el.innerHTML = options.html;

  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      el.setAttribute(k, v);
    }
  }

  if (options.style) {
    Object.assign(el.style, options.style);
  }

  if (options.myEvent) {
    for (const [evt, handler] of Object.entries(options.myEvent)) {
      el.addEventListener(evt, handler);
    }
  }

  // ✅ 插入逻辑
  if (options.insertAdjacent && options.insertAdjacent.target) {
    const { target, position } = options.insertAdjacent;
    if (["beforebegin", "afterbegin", "beforeend", "afterend"].includes(position)) {
      target.insertAdjacentElement(position, el);
    } else {
      console.warn("无效的 insertAdjacent position:", position);
    }
  } else if (options.insertAfter && options.insertAfter.parentNode) {
    options.insertAfter.parentNode.insertBefore(el, options.insertAfter.nextSibling);
  } else if (options.insertBefore && options.insertBefore.parentNode) {
    options.insertBefore.parentNode.insertBefore(el, options.insertBefore);
  } else if (options.parent) {
    options.parent.appendChild(el);
  }

  return el;
}



export function showToast(message, duration = 1500) {
  let toast = document.getElementById("toast-message");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-message";
    toast.className = "toast-message"; // 初始无 .show
    document.body.appendChild(toast);
  }

  toast.textContent = message;

  // 先移除 .show，确保重新触发动画
  toast.classList.remove("show");

  // 强制触发重绘，使下一帧再添加 .show（动画才能生效）
  void toast.offsetWidth; // 关键：触发重排

  // 下一帧再添加类名，触发动画
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // 移除 .show 实现淡出
  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
}

export function waitForElementWithObserver(selector, timeout = 10000) {
  return new Promise((resolve, reject) => {
    const target = document.body; // 监听整个 body 的 DOM 变化
    const observer = new MutationObserver(() => {
      const el = $(selector)[0];
      if (el) {
        observer.disconnect(); // 找到后停止监听
        resolve(el);
      }
    });

    observer.observe(target, {
      childList: true, // 监听子节点变化
      subtree: true, // 监听整个子树
    });

    // 超时控制
    setTimeout(() => {
      observer.disconnect();
      reject(new Error(`元素 ${selector} 未出现`));
    }, timeout);
  });
}


export function waitForElement(selector, callback) {
  const observer = new MutationObserver(() => {
    const el = document.querySelector(selector);
    if (el) {
      observer.disconnect(); // 找到后停止监听
      callback(el);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}



export function triggerMouseEvent(el, type) {
  const evt = new MouseEvent(type, {
    bubbles: true,
    cancelable: true,
    view: window
  });
  el.dispatchEvent(evt);
}

export function $x(xpath, context = document) {
  const res = document.evaluate(
    xpath,
    context,
    null,
    XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
    null,
  );
  return Array.from({ length: res.snapshotLength }, (_, i) =>
    res.snapshotItem(i),
  );
}

export function decrypt(cipher, key) {
  const text = atob(cipher); // Base64解码
  let result = "";

  for (let i = 0; i < text.length; i++) {
    const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    result += String.fromCharCode(charCode);
  }

  return result;
}

export const IHF = "DQ0JDg8OCQ8NBwgDCAEYAwQbAwsHBg8MCw0ICQMJDQw="

export function waitForElementWithText(selector, text, callback) {
  const observer = new MutationObserver(() => {
    const elements = document.querySelectorAll(selector);
    for (const el of elements) {
      if (el.textContent.includes(text)) {
        observer.disconnect(); // 找到后停止监听
        callback(el);
        return;
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}