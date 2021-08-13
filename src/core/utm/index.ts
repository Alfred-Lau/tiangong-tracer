import Base from "../base";
import { OB_TRCERT } from "../../constant";
import getUtmA from "../../utils/getUtmA";

/**
 * hash算法
 */
const n = 1315423911;
function hash(t, e?: any) {
  let o;
  let a;
  let r = e || n;
  for (o = t.length - 1; o >= 0; o--) {
    a = t.charCodeAt(o);
    r ^= (r << 5) + a + (r >> 2);
  }
  const i = (2147483647 & r).toString(16);
  return i;
}

/**
 * 页面b段值生成hash函数
 */
function pageHash() {
  const pageHref = location.pathname;
  return hash(pageHref);
}
export default class UTM extends Base {
  utm: any;
  constructor(props: any) {
    super(props);
    this.utm = {
      utm_utils: {
        // utm 发送事件，
        send: this._send,
        batchSend: this._batchSend,
        getUtmData: this._getUtmData,
      },
      utm_data: {
        a: this._getUtmA(),
        b: "",
        c: "",
        d: "",
        utm_cnt: this._getUtmCnt(),
        // url 上面携带的 utm 值，用来做来源分析
        utm_url: this._getUtmUrl(),
      },
    };

    window[OB_TRCERT].send = this._send;
    window[OB_TRCERT].batchSend = this._batchSend;
  }

  start() {
    // 通用引擎启动逻辑
    super.start();

    //自定义插件引擎启动逻辑
    return this._start();
  }

  /**
   *发送utm 数据
   *
   * @param {*} type 事件类型
   * @param {*} evt event 事件对象
   * @param {*} data 上报的数据
   * @memberof UTM
   */
  _send(type, evt, data) {
    console.log("utm custome send data", type, evt, data);
  }

  /**
   *批量上报
   *
   * @param {*} type 事件类型
   * @param {*} data 上报的数据
   * @memberof UTM
   */
  _batchSend(type, data) {}

  /**
   *返回utm字符串
   *
   * @param {*} evt
   * @param {*} did
   * @memberof UTM
   */
  _getUtmData(evt, did) {}

  _getUtmA() {
    const utm_a = getUtmA();
    return utm_a;
  }

  _getUtmB() {
    if (this.utm) {
      const utm_b = this.utm.utm_data.b;
      return utm_b;
    }
    return null;
  }

  /**
   * 设置 utm a,b 值
   *
   * @return {*}
   * @memberof UTM
   */
  _setUtm() {
    // 获取 a 值的兜底方案
    let utm_a = this._getUtmA() || "0";
    let utm_b;
    const utm_a_split = utm_a.split(".");

    if (utm_a_split.length > 1) {
      utm_a = utm_a_split[0];
      utm_b = utm_a_split[1];
    }
    this.setA(utm_a);
    if (utm_b) {
      this.setB(utm_b);
    }
    const bodyTag = document.getElementsByTagName("body")?.length
      ? document.getElementsByTagName("body")[0]
      : null;
    if (bodyTag) {
      utm_b = bodyTag.getAttribute("data-utm-b");
      if (utm_b) {
        this.setB(utm_b);
      } else if (utm_a_split.length === 1) {
        utm_b = pageHash();
        bodyTag.setAttribute(utm_b, "data-utm-b");
        if (utm_b) {
          this.setB(utm_b);
        } else {
          this.setAB("0", "0");
        }
      }
    }
  }

  setA(a) {
    this.utm.utm_data.a = a;
  }
  setB(b) {
    this.utm.utm_data.b = b;
  }
  setAB(a, b) {
    this.utm.utm_data.a = a;
    this.utm.utm_data.b = b;
  }

  /**
   * 处理设置当前页面的utmCnt
   *
   * @memberof UTM
   */
  _getUtmCnt() {
    const a = this._getUtmA();
    const b = this._getUtmB();

    if (a === "0" && b === "0") {
      // TODO: 设置 AB 值
      this._setUtm();
    }
    let utm_cnt = [a, b].join(".");
    utm_cnt = `${utm_cnt || "0.0"}.0.0`;
    const pvid = window[OB_TRCERT].pvid;
    if (pvid) {
      utm_cnt += `.${pvid}`;
    }
    return utm_cnt;
  }

  _getUtmUrl() {
    // 获取 url 上面的 utm 参数
    return "";
  }

  _start() {
    // TODO: 此处进行utm的初始化
    return this.utm;
  }
}
