import Tracer from "../tracer";

export type ClickOptions = {};

export default function (this, instance: Tracer, options: ClickOptions) {
  console.log(this, instance, options);
}
