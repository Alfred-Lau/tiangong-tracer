import Tracer from "./tracer";

function bootstrap(options?: CORE.BootstrapOptions) {
  const opts = options || {};
  const tracer = new Tracer(opts);
  if (!window.tiangong_tracert) {
    window.tiangong_tracert = tracer;
  }
}

if (typeof window !== "undefined") {
  bootstrap();
}
// 针对浏览器环境，直接挂载，npm 模式下 只导出对应方法

export default bootstrap;
