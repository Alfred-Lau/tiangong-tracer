declare namespace CORE {
  type BootstrapOptions = {
    /**
     *上报事件时间间隔
     *
     * @type {number}
     */
    threshold?: number;
  };
}

type Cookie = {
  expires: Date;
  security: boolean;
  domain: string;
  path: string;
  httponly: string;
  key: string;
  value: string;
};

type UsedCookie = Partial<Cookie>;
