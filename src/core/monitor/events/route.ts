import BaseEvent from "./base";
import { logInfo } from "../../../utils/log";

export interface IRouteEvent {
  handleStateChange: any;
  start: () => void;
}

export default class Route extends BaseEvent implements IRouteEvent {
  constructor(props) {
    super(props);
  }

  handleStateChange(e) {
    // 单页
    logInfo("route 导航事件被触发");
    const trcert = window[OB_TRCERT];
    const { version: trcert_version, utm: { utm_data = {} } = {}, _ } = trcert;

    const data = {
      __source__: "popstate",
      __tags__: {},
      title: document.title || "",
      utmCnt: utm_data.utm_cnt || "",
      pre: _.page_referrer || "",
      utmUrl: utm_data.utm_url || "",
      trcert_version,
      pathname: location.pathname,
      url: window.location.href,
      createTime: new Date().getTime(),
      logType: 2,
    };

    console.log("datammm", data);
    this.send(data);
  }

  start() {
    this.on(window, "popstate", (e) => this.handleStateChange(e));
  }
}
