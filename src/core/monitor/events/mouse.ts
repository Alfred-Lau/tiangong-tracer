import BaseEvent from "./base";
import { logInfo } from "../../../utils/log";
import { tryToGetAttribute } from "../../../utils/dom/attr";

export interface IMouseEvent {
  handleMouseEvent: any;
  start: () => void;
}

/**
 * mousedown事件的处理函数，根据绑定了data-utm-click属性的元素执行数据发送
 *
 * @export
 * @class MouseEvent
 */
export default class Mouse extends BaseEvent implements IMouseEvent {
  constructor(props) {
    super(props);
  }

  handleMouseEvent(e) {
    logInfo("mouse 事件被触发");
    let target = e.target;
    let tagName = target.tagName;

    if (tagName === "A") {
      // 处理 A 标签 跳转
      console.log("我是a 标签,直接处理", target);
      const utm_d = tryToGetAttribute(target, "data-utm-click");
      const payload = tryToGetAttribute(target, "data-utm-extra") || {};
      if (utm_d && payload) {
        this.sendEvent(e, utm_d, "click", payload);
        return;
      }

      if (!utm_d) {
        this.sendEvent(e, null, "click", {
          value: target.innerHTML || target.innerText,
          // 跳转链接
          goto: target.href,
          // 来源链接
          pre: location.pathname,
        });
        return;
      }

      if (!payload) {
        this.sendEvent(e, utm_d, "click", {
          value: target.innerHTML || target.innerText,
          // 跳转链接
          goto: target.href,
          // 来源链接
          pre: location.pathname,
        });
        return;
      }
    }
    // 非 跳转标签
    for (let utm_d; target && target.tagName !== "HTML"; ) {
      utm_d = tryToGetAttribute(target, "data-utm-click");
      const payload = tryToGetAttribute(target, "data-utm-extra") || {};

      let extra;
      try {
        extra = payload;
      } catch (error) {
        console.error(error);
      }
      // 业务自定义事件
      if (utm_d) {
        this.sendEvent(e, utm_d, "click", extra);
        break;
      }
      target = target.parentNode;
    }
  }

  start() {
    this.on(document, "mousedown", (e) => this.handleMouseEvent(e));
  }
}
