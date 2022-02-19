type OS_TYPE = "darwin" | "win32";
type BROWSER_TYPE = "chrome" | "safari";

declare namespace Model {
  type UserAgentInfo = {
    browser: UAParser.IBrowser;
    device: UAParser.IDevice;
    engine: UAParser.IEngine;
    os: UAParser.IOS;
    cpu: UAParser.ICPU;
    ua: string;
    screen: string;
  };
}

declare class BaseClass {
  constructor(name: string);
  constructor(name: string, age: number);
  public name: string;
  public sayName(): void;
}
