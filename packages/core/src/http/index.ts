import { isBrowser } from "@tg/utils";
import { ALiYunSLSAddress } from "@tg/shared";

function genImgUrl(url: string, data: any) {
  const formatted = JSON.stringify(data);
  return `${url}${formatted}`;
}

function basicHttp(url: string, data: any) {
  const img = document?.createElement("img");
  img.src = genImgUrl(url, data);
  img.style.display = "none";
  document.body.appendChild(img);
}

export default function (data: any) {
  if (isBrowser) {
    let send = null;
    if (navigator.sendBeacon) {
      // sendBeacon 支持
      return navigator.sendBeacon(ALiYunSLSAddress, JSON.stringify(data));
    } else {
      return basicHttp(ALiYunSLSAddress, {
        name: "hello,world",
      });
    }

    // return send(ALiYunSLSAddress, JSON.stringify(data));
  }
}
