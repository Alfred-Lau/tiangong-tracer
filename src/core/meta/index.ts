import Base from "../base";

export default class Meta extends Base {
  constructor(props) {
    super(props);
  }
  start() {
    super.start();
    return this._start();
  }

  _start() {
    return this.getInfo();
  }

  getInfo() {
    return { meta: "meta: 获取数据成功" };
  }
}
