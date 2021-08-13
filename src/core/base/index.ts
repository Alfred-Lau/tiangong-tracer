import { logError } from "../../utils/log";
import { getHref, getPathname } from "../../utils/location";
import { report } from "../../utils/report";
import { OB_TRCERT } from "../../constant/index";
import { ITrcert } from "../trcert";
import { getMousePos } from "../../utils/mouse";

export interface TrcertData {}

export type eventType = "click" | "hover";

export interface EventPayload {
  // 事件类型
  eventType: eventType;
  // utm 值 ‘a.b.c.d.pvid’
  utmCnt: string;
  // 鼠标 x 值
  mx: number;
  // 鼠标 y 值
  my: number;
  // trcert 基础版本信息
  trcert_version: string;
  // pathname
  pathname: string;
  //url
  url: string;
  // 创建时间
  createTime: number;
  // 日志类型 2. 为自定义日志
  logType: number;
  //浏览器尺寸 '100*200'
  screen: string;
  [key: string]: any;
}

export default class Base {
  private beforeSendPvQueues: (() => void)[] = [];

  constructor(props: any) {}

  start() {}

  beforeSendPv(callback: () => void) {
    if (typeof callback === "function") {
      this.beforeSendPvQueues.push(callback);
    } else {
      logError("breforeSendPV 只能接受函数作为参数");
    }
  }

  private async _sendPV(data: Partial<TrcertData>): Promise<void> {
    await report({ __topic__: "PV", ...data });
  }

  private _genPvData() {
    const { ua = {}, utm: { utm_data = {} } = {}, _ = {}, version, a } = window[
      OB_TRCERT
    ];

    const payload = {
      title: document.title || "",
      utmCnt: utm_data.utm_cnt || "",
      referrer: _.page_referrer || "",
      utmUrl: utm_data.utm_url || "",
      screen: ua.screen,
      os: ua.os.name,
      engina: ua.engine.name,
      browser: ua.browser.name,
      trcert_version: version,
      pathname: getPathname(),
      url: getHref(),
      createTime: new Date().getTime(),
      logType: 1,
      utma: a,
    };
    return payload;
  }

  private _genEventData(
    target: Event,
    utm_id: string | null,
    eventType: eventType,
    extra?: { [key: string]: any }
  ) {
    const trcert = window[OB_TRCERT];
    if (trcert) {
      const {
        version: trcert_version,
        pvid,
        ua,
        utm: { utm_data: { a, b, c } = {} } = {},
      } = trcert;

      const utmCnt = [a, b, c, utm_id].join(".");
      const mouse = getMousePos(target);
      const payload: EventPayload = {
        __source__: "event",
        __tags__: {},
        a: trcert.a,
        eventType: eventType || "click",
        // utm 值 ‘a.b.c.d.pvid’
        utmCnt,
        pvid,
        // 鼠标 x 值
        mx: mouse.x,
        // 鼠标 y 值
        my: mouse.y,
        // trcert 基础版本信息
        trcert_version,
        // pathname
        pathname: location.pathname,
        //url
        url: location.href,
        // 创建时间
        createTime: new Date().getTime(),
        // 日志类型 2. 为自定义日志
        logType: 2,
        //浏览器尺寸 '100*200'
        screen: ua.screen,
        extra,
      };
      return payload;
    }
    return null;
  }

  private async _sendEvent(data: any): Promise<void> {
    await report(data);
  }

  // 真正工作的 sendPV:构造并且发送
  async sendPV(): Promise<void> {
    // 执行前置 的回调函数队列
    await this.beforeSendPvQueues.map((cb) => cb && cb());

    const data = this._genPvData();
    this._sendPV(data);
  }
  // 发送事件埋点数据
  async sendEvent(
    target: Event,
    utm_id: string | null,
    eventType: eventType,
    extra: { [key: string]: any }
  ): Promise<void> {
    const data = this._genEventData(target, utm_id, eventType, extra);

    if (data) {
      await this._sendEvent(data);
    }
  }

  // 发送任务数据
  async send(data: any): Promise<void> {
    if (data) {
      await this._sendEvent(data);
    }
  }
}
