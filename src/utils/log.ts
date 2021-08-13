import brolog from "brolog";

export function logError(err: string) {
  brolog.error("error:", err);
}

export function logInfo(msg: string) {
  brolog.info("info:", msg);
}
