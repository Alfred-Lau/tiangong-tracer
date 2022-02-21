export const addTwo = (a: number, b: number) => a + b;
export const minus = (a: number, b: number) => a - b;
export const isBrowser = typeof window !== "undefined";
export const noop = () => {};
export const isFunction = (fn: any): fn is Function => {
  return typeof fn === "function";
};

export * as log from "./log";
