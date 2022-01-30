declare module "js-sls-logger";

declare type TracerMode = "web" | "mobile" | "node";

declare type TracerOptions = {
  mode: TracerMode;
};
