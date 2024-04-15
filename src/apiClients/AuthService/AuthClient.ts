import { AuthResponse } from "@/models/AuthResponse";
import { IAuthClient } from "./IAuthClient";
import axios, { AxiosError } from "axios";
import { getConfigs } from "@/configmanager/configmanager";
import { keyJetApiRequestHandler } from "@/request";
import { handleAxiosError } from "@/utill";
import toast from "react-hot-toast";

export const BASE_URL = getConfigs().urlConfigs.baseurl;
export const AuthClient: IAuthClient = {
  login: async function (
    username: string,
    password: string
  ): Promise<AuthResponse | undefined> {
    try {
      return (
        await axios.post(`${BASE_URL}/auth/login`, { username, password })
      ).data;
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);

      if (status === 404) {
        toast.error("User doesn't exists");
      } else {
        toast.error("Something went wrong please refresh");
      }
    }
  },
  register: async function (
    username: string,
    password: string
  ): Promise<AuthResponse | undefined> {
    try {
      return (
        await axios.post(`${BASE_URL}/auth/register`, { username, password })
      ).data;
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      if (status === 409) {
        toast.error("User alreadyc exists");
      } else {
        toast.error("Something went wrong please refresh");
      }
    }
  },
};
