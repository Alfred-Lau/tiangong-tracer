import { addTwo, minus } from "@tg/utils";
import tracer from "./bootstrap";

console.log(addTwo(100, 200), minus(200, 100));

export default tracer;
