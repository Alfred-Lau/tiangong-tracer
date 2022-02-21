import { log } from "@tg/utils";
import Tracer from "./tracer";

function bootstrap(options?: CORE.BootstrapOptions) {
  const opts = options;
  const tracer = new Tracer(opts);
  if (!window.tiangong_tracer) {
    window.tiangong_tracer = tracer;
  }
}

function testBeforeHook() {
  log.info("before 001");
  log.info("before 002");
}

function testAfterHook() {
  log.info("after 001");
  log.info("after 002");
}

if (typeof window !== "undefined") {
  bootstrap({
    beforeEachSendPV: testBeforeHook,
    afterEachSendPV: testAfterHook,
  });
}
// 针对浏览器环境，直接挂载，npm 模式下 只导出对应方法

export default bootstrap;
