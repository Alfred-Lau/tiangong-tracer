import logger from "./log-service";
import { getUuid } from "./uuid";

//  sendBeacon
export function reportWithBeacon(data: any) {
  if (navigator && navigator.sendBeacon) {
    navigator.sendBeacon(data);
  }
}

export function report(data: any) {
  // 用户来进行未登录用户标识
  const uuid = getUuid();
  // 用户来进行登录用户标识
  const userid = window.context?.userid || null;
  // 用户来进行登录用户标识
  const user = window.context?.user || {};
  //用来区分环境
  const env = location.origin;

  logger.send({ env, userid, user, uuid, ...data });
}
