import { isEmptyObject, log, mergeOptions, noop } from "@tg/utils";
import Base from "../base";
import click from "../plugins/click";
import input from "../plugins/input";
import spa from "../plugins/spa";
import UserAgent from "../models/agent";
import { getVersion } from "../utils/version";

const Model = Symbol("tiangong_tracer#model");
const Plugin = Symbol("tiangong_tracer#plugin");

type BasicOptionType = {
  version: string;
};

type FullOptionsType = Partial<CORE.BootstrapOptions> & BasicOptionType;

const defaultOptions: BasicOptionType = {
  version: getVersion(),
};
const defaultModels = [{ name: "agent", model: UserAgent }];
const defaultPlugins = [
  { name: "click", plugin: click },
  { name: "input", plugin: input },
  { name: "spa", plugin: spa },
];

export default class Tracer extends Base {
  private readonly options = defaultOptions as FullOptionsType;
  // 这行 crazy
  private [Model]: Record<string, any>[];
  private [Plugin]: Record<string, any>[];
  constructor(opts?: Partial<CORE.BootstrapOptions>) {
    super("");
    //此处初始化加载实体
    if (isEmptyObject(opts)) {
      this.options = mergeOptions(this.options, opts!) as FullOptionsType;
    }

    this[Model] = [];
    this[Plugin] = [];

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
    this[Plugin].push({ name: plugin.name, plugin });
  }

  public addModel(model: any) {
    // push 一个函数或者类进去
    this[Model].push({ name: model.name, model });
  }

  // TODO: 事件的注册和在整体 Tracer 上面的挂载

  /**
   * 1. 检查环境;
   * 2. 初始化各类实体，插件列表
   */
  public prepare() {
    log.info("Tracer 开始进行前置检查");

    try {
      this.http({
        name: "http 模块检查成功",
      });
    } catch (e) {
      log.error("check failed", "检查失败，不会启动实例");
    }
    //  加载实体: 传参监视；默认 defaultModels 这个需要做处理
    for (const p of defaultModels) {
      const { model } = p;
      this.modelCount++;
      this.addModel(model);
    }

    //  加载插件  这个需要做处理
    for (const p of defaultPlugins) {
      const { name, plugin } = p;
      this.pluginCount++;
      this.addPlugin(plugin, { name });
    }
  }

  /**
   * 1. 依次启动插件，实体，实例化
   * 2. 插件都启动之后，
   * 3. 启动应用上报
   */
  public run() {
    log.info("Tracer 开始进行启动");

    // 1. 启动实体
    for (const m of this[Model]) {
      const { model } = m;
      const instance = new model(this, () => {
        log.info(instance.info);
      });
    }

    // 2. 启动插件
    for (const p of this[Plugin]) {
      const { name, plugin } = p;
      const instance = new plugin(this, () => {
        log.info(`${name} 插件被加载完成`);
      });
    }

    //  3. 首次上报
    return this.send("connect");
  }

  public end() {
    log.info("Tracer 初始化完成");
  }
}
