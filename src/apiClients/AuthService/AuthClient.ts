import { AuthResponse } from "@/models/AuthResponse";
import { IAuthClient } from "./IAuthClient";
import axios from "axios";

export const BASE_URL = `http://localhost:3000/api/v0.1`
export const AuthClient : IAuthClient = {
    login: function (username: string, password: string): Promise<AuthResponse> {
        return axios.post(`${BASE_URL}/auth/login`,{username,password});
    },
    register: function (username: string, password: string): Promise<AuthResponse> {
        return axios.post(`${BASE_URL}/auth/login`,{username,password});
    }
}