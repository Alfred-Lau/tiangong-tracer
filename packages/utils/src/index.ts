export const addTwo = (a: number, b: number) => a + b;
export const minus = (a: number, b: number) => a - b;
export const isBrowser = typeof window !== "undefined";

export * as error from "./error";
