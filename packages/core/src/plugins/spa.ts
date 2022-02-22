/**
 * 用来最 spa 应用进行插件化处理
 */
import { log } from "@tg/utils";
import Tracer from "../tracer";

export default function (instance: Tracer, cb?: handleType) {
  log.info(
    `我是 SPA 使用的插件,我用来进行对于单页应用路由的相关事件进行 aop 处理`
  );
}
