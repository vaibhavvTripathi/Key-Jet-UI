import { AuthResponse } from "@/models/AuthResponse";
import { IAuthClient } from "./IAuthClient";
import axios from "axios";
import { getConfigs } from "@/configmanager/configmanager";

export const BASE_URL = getConfigs().urlConfigs.baseurl
export const AuthClient : IAuthClient = {
    login: function (username: string, password: string): Promise<AuthResponse> {
        return axios.post(`${BASE_URL}/auth/login`,{username,password});
    },
    register: function (username: string, password: string): Promise<AuthResponse> {
        return axios.post(`${BASE_URL}/auth/register`,{username,password});
    }
}