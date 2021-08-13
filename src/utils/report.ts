import { REPORTER_URL, DEFAULT_UUID } from "../constant/index";
import { parseObjToQuery } from "./common";
import logger from "./log-service";
import { getUuid } from "./uuid";

//  sendBeacon
export function reportWithBeacon(data: any) {
  if (navigator && navigator.sendBeacon) {
    navigator.sendBeacon(data);
  }
}

export function report(data: any) {
  // const src = `${REPORTER_URL}?${parseObjToQuery(data)}`;
  // const img = new Image();
  console.log("reporter data:", data);
  const uuid = getUuid();

  // img.src = src;
  // 日志上报
  // 日志主题

  logger.send({ haha: "hahahah", uuid, ...data });
}
