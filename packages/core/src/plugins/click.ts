import Tracer from "../tracer";

export type ClickOptions = {};

export default function (instance: Tracer, options: ClickOptions) {
  log.info(instance, options);
}
