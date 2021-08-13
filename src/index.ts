import Reporter from "./core";
import { getUuid, setUuid } from "./utils/uuid";
import logger from "./utils/log-service";

export default function bootstrap(): void {
  // 1. 先获取 uuid 用来定义 浏览器全局变量
  const uuid = getUuid();
  if (!uuid) {
    setUuid();
  }

  // 2. 上报启动
  const reporter = new Reporter();
  reporter.bootstrap();
}
if (!window.oblog) {
  window.oblog = logger;
}

export const oblog = logger;

bootstrap();
