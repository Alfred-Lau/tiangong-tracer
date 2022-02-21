import { log, noop } from "@tg/utils";
import Base from "../base";
import click from "../plugins/click";

const defaultOptions = {};
// const defaultPlugins = [noop];
const defaultPlugins = [{ name: "click", plugin: click }];

export default class Tracer extends Base {
  private plugins = [] as any[];
  private options = defaultOptions;
  constructor(opts?: CORE.BootstrapOptions) {
    super("");
    if (opts?.beforeEachSendPV) {
      this.beforeEachSendPV(opts.beforeEachSendPV);
    }

    if (opts?.afterEachSendPV) {
      this.afterEachSendPV(opts.afterEachSendPV);
    }
    Promise.resolve()
      .then(this.prepare.bind(this))
      .then(this.run.bind(this))
      .then(this.end.bind(this));
  }

  public mergePluginOptions(name: string, option: Partial<CORE.PluginOptions>) {
    log.info(option);
  }

  public addPlugins(plugin: handleType, option: Partial<CORE.PluginOptions>) {
    this.mergePluginOptions("", option);
    // push 一个函数或者类进去
    this.plugins.push({ name: plugin.name, plugin });
  }

  public prepare() {
    log.info("prepare");
    //该阶段执行的流程：1. 检查环境; 2. 加载默认插件和自定义插件；
    try {
      this.http({
        name: "hello,world",
      });
    } catch (e) {
      log.error("check failed", "检查失败，不会启动实例");
    }
    defaultPlugins.forEach(({ name, plugin }) => {
      this.addPlugins(plugin, { name });
    });
  }

  public run() {
    //该阶段执行的流程：1. 依次启动插件；2. 插件都启动之后，开始启动应用上报
    log.info("run");
    this.plugins.forEach((p) => {
      // 1.0.0 支持同步插件
      // p(this, {});
      const { name, plugin } = p;
      const instance = new plugin(this);
    });

    //  3. 首次上报
    return this.send("connect");
  }

  public end() {
    log.info("end");
  }
}
