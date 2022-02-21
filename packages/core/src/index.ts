import { addTwo, minus, log } from "@tg/utils";
import tracer from "./bootstrap";

log.info(minus(200, 100));
log.info(addTwo(100, 200));

export default tracer;
