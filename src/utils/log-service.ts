import SlsWebLogger from "js-sls-logger";
import { LogOpts } from "../config/log";

const logger = new SlsWebLogger(LogOpts);

export default logger;
