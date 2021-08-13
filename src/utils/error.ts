import { logError } from "./log";

export default function (e: Error) {
  // 默认直接打印
  logError(e.message);
}
