// 是否是相同页面的 path
export function isEquealPath(val: string) {
  const url = location.href;
  return val && url.split("#")[0] === val.split("#")[0];
}

function trim(data: string) {
  return data.trim();
}

function isStartWith(tar: string, starter: string) {
  return tar.startsWith(starter);
}

function isContain(target: string, part: string) {
  return target.indexOf(part) > -1;
}

export function tryToGetHref(target: any) {
  try {
    return trim(target.getAttribute("href"));
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export default function is_ignore_utm(target: any) {
  const href = tryToGetHref(target);
  if (!href) {
    return true;
  }

  const isEqualPath = isEquealPath(href);
  const startStr = ["javascript:", "sms:", "tel:", "#", "blob:"];
  const startFlag = startStr.some((str) => isStartWith(href, str));
  return startFlag || isContain(href, "#/") || isEqualPath;
}
