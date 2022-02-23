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

export const defineProperties = <T>(
  key: T,
  prop: PropertyDescriptorMap & ThisType<T>
) => {
  Object.defineProperties(key, prop);
};

export * as log from "./log";
export * as cookie from "./cookie";
