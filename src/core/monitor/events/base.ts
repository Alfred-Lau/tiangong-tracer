import Base from "../../base";

/**
 *事件基类
 *
 * @export
 * @class BaseEvent
 */
export default class BaseEvent extends Base {
  constructor(props) {
    super(props);
  }
  on(
    target: HTMLElement | Document | Window,
    type: string,
    handler: any,
    options?: boolean | AddEventListenerOptions | undefined
  ) {
    target.addEventListener(type, handler, options);
  }
}
