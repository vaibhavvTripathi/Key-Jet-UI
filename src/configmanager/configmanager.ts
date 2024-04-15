import localConfigs from "../configmanager/global_configs.json"
import { KeyjetConfigs } from "./configType"

export const getConfigs = ()=> {
  const keyJetConfigs : KeyjetConfigs = JSON.parse(JSON.stringify(localConfigs));
  return keyJetConfigs;
}