// import { v1 as uuidv1 } from "uuid";

import { DEFAULT_UUID } from "../constant";
import cookie from "./cookie";

function genRandomUUid(): string {
  return Math.random().toString();
}

/**
 * 获取埋点实例 uuid
 *
 * @export
 * @return {*}  {string}
 */
export function getUuid(): string {
  const uuid = cookie.getCookie(DEFAULT_UUID);

  return uuid;
}

/**
 *设置 埋点实例 uuid
 *
 * @export
 */
export function setUuid(): string {
  let uuid = cookie.getCookie(DEFAULT_UUID);
  if (!uuid) {
    uuid = genRandomUUid();

    cookie.setCookie(DEFAULT_UUID, uuid, {
      expires: 365 * 10,
    });
    return uuid;
  }
  return uuid;
}
