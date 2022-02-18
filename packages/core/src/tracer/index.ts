import { error } from "@tg/utils";
import Base from "../base";

const defaultOptions = {};
const defaultPlugins = ["click"];

export default class Tracer extends Base {
  private plugins = [];
  private options = defaultOptions;
  constructor(opts: CORE.BootstrapOptions) {
    super();
    Promise.resolve()
      .then(() => {
        this.prepare();
      })
      .then(() => {
        this.run();
      })
      .then(() => {
        this.end();
      });
  }

  public mergePluginOptions(options) {
    console.log(this.options, options);
  }

  public addPlugins(plugin, options) {
    this.mergePluginOptions(options);
    this.plugins.push(plugin);
  }

  public prepare() {
    console.log("prepare");
    //该阶段执行的流程：1. 检查环境; 2. 加载默认插件和自定义插件；
    try {
      this.http({
        name: "hello,world",
      });
    } catch (e) {
      error.error("check failed", "检查失败，不会启动实例");
    }
    defaultPlugins.forEach((plugin) => {
      const pluginInstance = this.addPlugins(plugin, {});
    });
  }

  public run() {
    //该阶段执行的流程：1. 依次启动插件；2. 插件都启动之后，开始启动应用上报
    console.log("run", this);
    this.plugins.forEach((p) => {
      // 1.0.0 支持同步插件
      // p(this, {});
    });
  }

  public end() {
    console.log("end");
  }
}
