/**
 * 请实现
 * - 一个生命周期钩子
 * - 集成基本的上报能力
 *
 * 【组合优于继承】
 */
import http from "../http";

export default class Base {
  public http: (...args: any[]) => void;
  constructor() {
    this.http = http;
  }
}
