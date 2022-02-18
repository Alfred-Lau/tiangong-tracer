export default class UserAgent {
  private collect(): Model.UserAgentInfo {
    const browser = this.browser;
    const device = this.device;
    const engine = this.engine;
    const os = this.os;
    const cpu = this.cpu;
    const ua = this.ua;
    const screen = this.screen;
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

  public get info(): Model.UserAgentInfo {
    return this.collect();
  }

  private get browser(): Model.UserAgentInfo["browser"] {
    return {
      name: "chrome",
      version: "",
      major: "",
    };
  }
  private get device(): Model.UserAgentInfo["device"] {
    return {
      model: "",
      vendor: "",
      type: "",
    };
  }
  private get engine(): Model.UserAgentInfo["engine"] {
    return {
      name: "chrome",
      version: "",
    };
  }
  private get cpu(): Model.UserAgentInfo["cpu"] {
    return {
      architecture: "",
    };
  }
  private get os(): Model.UserAgentInfo["os"] {
    return {
      name: "chrome",
      version: "",
    };
  }
  private get ua(): Model.UserAgentInfo["ua"] {
    return "";
  }
  private get screen(): Model.UserAgentInfo["screen"] {
    return "";
  }
}
