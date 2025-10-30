import localConfigs from "../configmanager/local_configs.json"
import { KeyjetConfigs } from "./configType"

export const getConfigs = ()=> {
  const keyJetConfigs : KeyjetConfigs = JSON.parse(JSON.stringify(localConfigs));
  return keyJetConfigs;
}