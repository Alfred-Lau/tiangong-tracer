import { log } from "@tg/utils";
import Tracer from "../tracer";

export default function (instance: Tracer, cb: handleType) {
  cb && cb();
}
