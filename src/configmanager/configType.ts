export enum KeyjetMode {
  PROD = 0,
  DEV = 1,
}

export type KeyjetConfigs = {
  mode : KeyjetMode,
  urlConfigs : UrlConfigs
}

export type UrlConfigs = {
    baseurl : string
}