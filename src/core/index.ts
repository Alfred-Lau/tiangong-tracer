import Trcert from "./trcert";

const threshhold = 50;

// 主流程
export default class Core {
  trcert: Trcert | null = null;
  constructor() {}

  bootstrap() {
    try {
      // 1. 执行挂载
      this._run();

      // 2. 初始化 trcert 实体,允许自定义启动流程, 单例，只加载一次
      if (!this.trcert) {
        this.trcert = new Trcert({});
      }
    } catch (error) {
      console.error(error);
    }
  }

  _run() {
    if (document.getElementsByTagName("body").length > 0) {
      // body 已挂载
    } else {
      setTimeout(this._run, threshhold);
    }
  }
}
