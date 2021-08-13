import BaseModel from "./base";
import UaParser, { IBrowser, ICPU, IDevice, IEngine, IOS } from "ua-parser-js";

export type OS_TYPE = "darwin" | "win32";
export type BROWSER_TYPE = "chrome" | "safari";

export interface UserAgentModel {
  browser: IBrowser;
  device: IDevice;
  engine: IEngine;
  os: IOS;
  cpu: ICPU;
  ua: string;
  screen: string;
}

export interface IUserAgent {
  // method
  getResult: () => UserAgentModel;
  getBrowser: () => IBrowser;

  // property
  uaParser: UaParser;
}

export default class UserAgent extends BaseModel implements IUserAgent {
  uaParser = new UaParser();
  constructor() {
    super();
  }

  getBrowser(): IBrowser {
    return this.uaParser.getBrowser();
  }

  getDevice(): IDevice {
    return this.uaParser.getDevice();
  }

  getEngine(): IEngine {
    return this.uaParser.getEngine();
  }

  getOS(): IOS {
    return this.uaParser.getOS();
  }

  getCPU(): ICPU {
    return this.uaParser.getCPU();
  }

  getUA(): string {
    return this.uaParser.getUA();
  }

  getScreen(): string {
    const h = window.screen.height;
    const w = window.screen.width;
    return `${h}x${w}`;
  }

  getResult(): UserAgentModel {
    const browser = this.getBrowser();
    const device = this.getDevice();
    const engine = this.getEngine();
    const os = this.getOS();
    const cpu = this.getCPU();
    const ua = this.getUA();
    const screen = this.getScreen();
    return {
      browser,
      device,
      engine,
      os,
      cpu,
      ua,
      screen,
    };
  }
}
