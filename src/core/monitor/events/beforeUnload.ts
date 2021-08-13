import BaseEvent from "./base";
import { logInfo } from "../../../utils/log";
import { OB_TRCERT } from "../../../constant";

export interface IBeforeUnloadEvent {
  handleBeforeUnloadEvent: any;
  start: () => void;
}

/**
 * mousedown事件的处理函数，根据绑定了data-utm-click属性的元素执行数据发送
 *
 * @export
 * @class MouseEvent
 */
export default class Mouse extends BaseEvent implements IBeforeUnloadEvent {
  constructor(props) {
    super(props);
  }

  handleBeforeUnloadEvent(e) {
    logInfo("beforeunload 事件被触发");
    const trcert = window[OB_TRCERT];
    const { version: trcert_version, utm: { utm_data = {} } = {}, _ } = trcert;

    const data = {
      __source__: "beforeunload",
      __tags__: {},
      title: document.title || "",
      utmCnt: utm_data.utm_cnt || "",
      pre: _.page_referrer || "",
      utmUrl: utm_data.utm_url || "",
      trcert_version,
      pathname: location.pathname,
      url: window.location.href,
      createTime: new Date().getTime(),
      logType: 3,
    };

    console.log("datammm", data);
    this.send(data);
  }

  start() {
    this.on(window, "beforeunload", (e) => this.handleBeforeUnloadEvent(e));
  }
}
