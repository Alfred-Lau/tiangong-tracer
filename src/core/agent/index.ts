import Base from "../base";
import UserAgent from "../../models/userAgent";

export default class Agent extends Base {
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
    const ua = new UserAgent().getResult();

    return ua;
  }
}
