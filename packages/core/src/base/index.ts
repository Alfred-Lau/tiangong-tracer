/**
 * 请实现
 * 采集模块依赖的基类代码【1. 生命周期的机制实现；2. 插件机制的实现；3.】
 */
import { noop, isFunction, log } from "@tg/utils";
import http from "../http";

export default class Base implements BaseClass {
  public http: (...args: any[]) => void;
  public beforeEachSendPVEvents: handleType[] = [];
  public afterEachSendPVEvents: handleType[] = [];
  public pluginCount: number = 0;
  public eventsCache: {};
  constructor(public name: string) {
    this.http = http;
    //各类事件的缓存
    this.eventsCache = {};
  }

  // 事件周期的回调
  public beforeEachSendPV(fn = noop) {
    if (!isFunction(fn)) {
      log.error("注册的事件只能是函数", "");
      return;
    }

    this.beforeEachSendPVEvents.push(fn);
  }
  public afterEachSendPV(fn = noop) {
    if (!isFunction(fn)) {
      log.error("注册的事件只能是函数", "");
      return;
    }
    this.afterEachSendPVEvents.push(fn);
  }

  // TODO: 事件注册

  // TODO: 生命周期的实现

  // 基础上报的实现
  public async send(eventName: string): Promise<any> {
    this.beforeEachSendPVEvents.map((ev) => {
      ev && ev();
    });

    const payload: Partial<SimpleEventPayloadType> = {
      eventType: "click",
    };

    this.http(payload);

    return Promise.resolve().finally(() => {
      this.afterEachSendPVEvents.map((ev) => {
        ev && ev();
      });
    });
  }
}
