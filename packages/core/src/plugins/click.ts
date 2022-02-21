import { log } from "@tg/utils";
import Tracer from "../tracer";

export type ClickOptions = {};

export default function (instance: Tracer, options: ClickOptions) {
  log.info("我是click插件的实例");
  log.info(instance);
  log.info(options);
}
