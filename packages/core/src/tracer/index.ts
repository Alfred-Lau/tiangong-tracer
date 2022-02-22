import { log, noop } from "@tg/utils";
import Base from "../base";
import click from "../plugins/click";
import input from "../plugins/input";
import spa from "../plugins/spa";
import UserAgent from "../models/agent";

const Model = Symbol("tiangong_tracer#model");

const defaultOptions = {};
const defaultPlugins = [
  { name: "click", plugin: click },
  { name: "input", plugin: input },
  { name: "spa", plugin: spa },
];

export default class Tracer extends Base {
  private plugins = [] as any[];
  private options = defaultOptions as Partial<CORE.BootstrapOptions>;
  // 这行 crazy
  private [Model]: Record<string, UserAgent>;
  constructor(opts?: Partial<CORE.BootstrapOptions>) {
    super("");
    //此处初始化加载实体
    this.options = opts || {};
    this[Model] = { agent: new UserAgent() };

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

  public addPlugin(plugin: handleType, option: Partial<CORE.PluginOptions>) {
    this.mergePluginOptions("", option);
    // push 一个函数或者类进去
    this.plugins.push({ name: plugin.name, plugin });
  }

  // TODO: 事件的注册和在整体 Tracer 上面的挂载

  public prepare() {
    log.info("prepare");
    //该阶段执行的流程：1. 检查环境; 2. 加载默认插件和自定义插件；
    try {
      this.http({
        name: "http 模块检查成功",
      });
    } catch (e) {
      log.error("check failed", "检查失败，不会启动实例");
    }
    //  加载实体
    Object.keys(this[Model]).forEach((key) => {
      const model = this[Model][key];
      console.log(model.info);
    });
    // 加载插件
    defaultPlugins.forEach(({ name, plugin }) => {
      this.pluginCount++;
      this.addPlugin(plugin, { name });
    });
  }

  public run() {
    //该阶段执行的流程：1. 依次启动插件；2. 插件都启动之后，开始启动应用上报
    log.info("run");
    // 启动插件
    this.plugins.forEach((p) => {
      // 1.0.0 支持同步插件
      // p(this, {});
      const { name, plugin } = p;
      const instance = new plugin(this, () => {
        log.info(`${name} 插件被加载完成`);
      });
    });

    //  3. 首次上报
    return this.send("connect");
  }

  public end() {
    log.info("Tracer 初始化完成");
  }
}
