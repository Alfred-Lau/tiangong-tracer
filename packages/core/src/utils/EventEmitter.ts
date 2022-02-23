/**
 * 浏览器运行时使用的事件机制
 */
class EventEmitter {
  private readonly listeners: Map<EventType, handleType[]>;
  constructor() {
    // 事件监听收集器
    this.listeners = new Map();
  }
  /**
   * 监听事件
   * @param type
   * @param fn
   */
  public on(type: EventType, fn: handleType) {
    if (!this.listeners.has(type) || !this.listeners.get(type)) {
      this.listeners.set(type, []);
    }

    const handlers = [...this.listeners.get(type)!, fn];
    this.listeners.set(type, handlers);
  }

  /**
   * 触发事件
   * @param type
   */
  public emit(type: EventType) {}

  /**
   * 移除事件
   * @param type
   * @param fn
   */
  public off(type: EventType, fn: handleType) {}
}

export enum EventType {
  START = "START",
  OFFLINE = "OFFLINE",
}

export default EventEmitter;
