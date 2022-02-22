import { log } from "@tg/utils";
import Tracer from "../tracer";

export default function (instance: Tracer, cb: handleType) {
  log.info("我是 input 插件的实例");
  log.info("我是 input 插件中对应的实例", instance);

  cb && cb();
}
