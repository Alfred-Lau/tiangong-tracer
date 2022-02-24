export const isBrowser = typeof window !== "undefined";
export const noop = () => {};
export const isFunction = (fn: any): fn is Function => {
  return typeof fn === "function";
};

export const mergeOptions = (target: object, dest: object) => {
  return Object.assign(target, dest);
};

export type NullOrUndefinedType = null | undefined;

export const isEmptyObject = (obj: object | NullOrUndefinedType): boolean => {
  if (!obj) return false;
  return Object.keys(obj).length === 0;
};

export const defineProperty = <T>(
  host: T,
  key: string,
  prop: PropertyDescriptor & ThisType<T>
) => {
  Object.defineProperty(host, key, prop);
};

export * as log from "./log";
export * as cookie from "./cookie";
