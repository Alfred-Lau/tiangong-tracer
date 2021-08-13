import Base from "../base";
import Mouse from "./events/mouse";
import Route from "./events/route";
import BeforeUpload from "./events/beforeUnload";

export default class Monitor extends Base {
  constructor(props: any) {
    super(props);
  }

  start() {
    // 通用引擎启动逻辑
    super.start();

    //自定义插件引擎启动逻辑
    return this._start();
  }

  _start() {
    // 监听鼠标事件【1.点击页面；2.点击链接】
    new Mouse({}).start();

    // 监听卸载页面
    new BeforeUpload({}).start();
    new Route({}).start();
  }
}
