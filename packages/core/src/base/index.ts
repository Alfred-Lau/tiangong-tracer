/**
 * 请实现
 * 采集模块依赖的基类代码【1. 生命周期的机制实现；2. 插件机制的实现；3.】
 */
import { noop, isFunction, log, defineProperties } from "@tg/utils";
import http from "../http";
import Tracer from "../tracer";

export default class Base implements BaseClass {
  public http: (...args: any[]) => void;
  public beforeEachSendPVEvents: handleType[] = [];
  public afterEachSendPVEvents: handleType[] = [];
  public pluginCount: number = 0;
  public modelCount: number = 0;
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

  /**
   * 通用的挂载方法
   * @param host 需要被挂载对象的 宿主对象
   * @param key 需要被挂载的 key
   * @param ctx 需要挂载 key 的描述对象
   */
  public set(host: Tracer, key: string, ctx: any) {
    defineProperties<typeof host>(host, {
      [key]: {
        value: ctx,
        configurable: false,
        enumerable: false,
        writable: false,
        get() {
          return this;
        },
        set(val) {
          this[key] = val;
        },
      },
    });
  }

  // TODO: 生命周期的实现
  public call(signature: string, fn: string): void {}

  // 基础上报的实现
  public async send(eventName: string) {
    this.beforeEachSendPVEvents.map((ev) => {
      ev && ev();
    });

    const payload: Partial<SimpleEventPayloadType> = {
      eventType: "click",
    };

    this.http(payload);

    Promise.resolve().finally(() => {
      this.afterEachSendPVEvents.map((ev) => {
        ev && ev();
      });
    });
  }
}
