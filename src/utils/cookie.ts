export interface CookieOption {
  expires?: number | Date;
  domain?: string;
  path?: string;
}

/**
 *私域 底层支持 设置 cookie
 *
 * @param {string} key
 * @param {string} val
 * @param {CookieOption} options
 */

function __setCookie(key: string, val: string, options: CookieOption = {}) {
  const expires = options.expires;
  let date = new Date();
  if (expires && (typeof expires === "number" || expires.toUTCString)) {
    if (typeof expires === "number") {
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
    } else {
      date = expires;
    }
    val += `;expires=${date.toUTCString()}`;
  }
  val += `;domain=${options.domain}`;
  val += `;path=/`;

  document.cookie = `${key}=${val}`;

  return getCookie(key);
}

/**
 *获取所有上级域名
 *
 */
function getDomains(): string[] {
  const domains = [];
  const hostname = location.hostname;
  try {
    const arr = hostname.split(".");
    const len = arr.length;
    if (len > 1) {
      // 处理存在多级域名的情况
      for (let i = 2; i <= len; i++) {
        const parts = arr.slice(len - i);
        const domain = parts.join(".");
        domains.push(domain);
      }
    } else {
      // 处理 一级域名
      domains.push(hostname);
    }
  } catch (error) {}
  return domains;
}

/**
 *设置 cookie
 *
 * @param {string} key
 * @param {string} value
 * @param {CookieOption} options
 */

function setCookie(key: string, value: string, options: CookieOption) {
  try {
    if (!options) {
      options = {};
    }
    if (options.domain) {
      __setCookie(key, value, options);
    } else {
      const domains = getDomains();
      for (let i = 0; i < domains.length; ) {
        //TODO: 这部分的逻辑可能有问题
        options.domain = domains[i];
        if (__setCookie(key, value, options)) {
          i = domains.length;
        } else {
          i++;
        }
      }
    }
  } catch (error) {}
}

/**
 *获取 cookie
 *
 * @param {string} key
 * @return {*}  {string}
 */
function getCookie(key: string): string {
  // 正则选择 cookie
  const result = document.cookie.match(new RegExp(`(?:^|;)\\s*${key}=([^;]+)`));
  return result ? result[1] : "";
}

export default {
  setCookie,
  getCookie,
};
