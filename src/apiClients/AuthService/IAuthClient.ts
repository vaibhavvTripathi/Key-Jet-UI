import { AuthResponse } from "@/models/AuthResponse";

export interface IAuthClient {
  login: (username: string, password: string) => Promise<AuthResponse>;
  register: (username: string, password: string) => Promise<AuthResponse>;
}
