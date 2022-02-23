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

export * as log from "./log";
export * as cookie from "./cookie";
