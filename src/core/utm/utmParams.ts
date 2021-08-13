const ANCHORID = "data-utm-anchor-id";

/**
 *校验 utm id
 *
 * @export
 * @param {*} target
 * @param {*} e
 */
export function utm_utmAnchorChk(target: any, e) {}

/**
 * 获取utmCnt
 * @param {Element} target
 */
export function utm_getUTMParam(target) {
  let utmCont;
  const tagName = target.tagName;
  if (tagName !== "A" && tagName !== "AREA") {
  }
}
