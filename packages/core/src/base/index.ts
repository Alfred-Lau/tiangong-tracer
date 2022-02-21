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
  constructor(public name: string) {
    this.http = http;
  }

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

  public async send(eventName: string): Promise<any> {
    this.beforeEachSendPVEvents.map((ev) => {
      ev && ev();
    });

    function inner() {
      log.info(eventName);
    }
    return Promise.resolve()
      .then(inner)
      .finally(() => {
        this.afterEachSendPVEvents.map((ev) => {
          ev && ev();
        });
      });
  }
}
