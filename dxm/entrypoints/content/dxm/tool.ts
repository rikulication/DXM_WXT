function sleep(ms:number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


type InsertAdjacentOptions = {
  target: HTMLElement;
  position: "beforebegin" | "afterbegin" | "beforeend" | "afterend";
};

type ElementOptions = {
  className?: string;
  text?: string;
  html?: string;
  attrs?: Record<string, string | number | boolean>;
  style?: Partial<CSSStyleDeclaration>;
  myEvent?: Partial<{ [K in keyof HTMLElementEventMap]: (ev: HTMLElementEventMap[K]) => void }>;
  parent?: HTMLElement;
  insertAfter?: HTMLElement;
  insertBefore?: HTMLElement;
  insertAdjacent?: InsertAdjacentOptions;
};

function createElementEx<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  options: ElementOptions = {}
): HTMLElementTagNameMap[K] {
  const el = document.createElement(tagName);

  // 类名
  if (options.className) el.className = options.className;

  // 文本与 HTML 内容
  if (options.text) el.textContent = options.text;
  else if (options.html) el.innerHTML = options.html;

  // 属性
  if (options.attrs) {
    for (const [k, v] of Object.entries(options.attrs)) {
      el.setAttribute(k, String(v));
    }
  }

  // 样式
  if (options.style) {
    Object.assign(el.style, options.style);
  }

  // 事件
  if (options.myEvent) {
    for (const [evt, handler] of Object.entries(options.myEvent)) {
      el.addEventListener(evt, handler as EventListener);
    }
  }

  // 插入逻辑
  if (options.insertAdjacent?.target) {
    const { target, position } = options.insertAdjacent;
    if (["beforebegin", "afterbegin", "beforeend", "afterend"].includes(position)) {
      target.insertAdjacentElement(position, el);
    } else {
      console.warn("无效的 insertAdjacent position:", position);
    }
  } else if (options.insertAfter?.parentNode) {
    options.insertAfter.parentNode.insertBefore(el, options.insertAfter.nextSibling);
  } else if (options.insertBefore?.parentNode) {
    options.insertBefore.parentNode.insertBefore(el, options.insertBefore);
  } else if (options.parent) {
    options.parent.appendChild(el);
  }

  return el;
}


function showToast(message:string, duration = 1500) {
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



function waitForElement(selector: string, callback: (el: Element) => void) {
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



function triggerMouseEvent(el:any, type:any) {
    const evt = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window
    });
    el.dispatchEvent(evt);
}

function $x(xpath:string, context = document) {
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