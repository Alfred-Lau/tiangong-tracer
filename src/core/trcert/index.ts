import { getHref, getReffer } from "../../utils/location";
import getPvId from "../../utils/pvid";
import Base from "../base";
import version from "../../utils/version";
import Meta from "../meta";
import Utm from "../utm";
import UserAgent from "../agent";
import Monitor from "../monitor";
import { OB_TRCERT } from "../../constant";
import getUtmA from "../../utils/getUtmA";

export interface ITrcert {
  version: string;
  _: TrcertData;
  status: TrcertStatus;
  [key: string]: any;
}

export interface TrcertData {
  page_url: string;
  page_referrer: string;
  _utm: {
    data: object;
  };
  _meta: object;
}

export enum TrcertStatus {
  COMPLETE = "complete",
  WORKING = "working",
  IDLE = "idle",
}

/**
 * 初始化 trcert，挂载在window中
 *  trcert主要存放一些方法、基础信息和应用状态变量
 */
export default class Trcert extends Base implements ITrcert {
  _ = {
    page_url: "",
    page_referrer: "",
  };

  status = TrcertStatus.IDLE;

  version = version();
  // 数据属性
  a = getUtmA();

  // 功能对象
  utm: any;
  meta: any;
  ua: any;
  // session pv id,also knownn e
  pvid: any;

  constructor(props: any) {
    super(props);
    // 前置挂载，非常重要
    window[OB_TRCERT] = this;

    this.pvid = getPvId();
    this.init();
  }

  init() {
    const meta = new Meta({});
    const utm = new Utm({});
    const ua = new UserAgent({});
    const monitor = new Monitor({});

    // 绑定 UTM 函数 到全局
    this.meta = meta.start();
    this.utm = utm.start();
    this.ua = ua.start();
    this.status = TrcertStatus.COMPLETE;

    // 启动 Monitor 监听，必须保证 在 utm 之后
    monitor.start();

    // 注入发送前回调事件
    this.beforeSendPv(() => {
      this._.page_url = getHref();
      this._.page_referrer = getReffer();
    });

    // 发送 PV
    this.sendPV();
  }
}
