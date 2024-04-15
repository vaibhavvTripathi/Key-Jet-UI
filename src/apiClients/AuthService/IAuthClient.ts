import { AuthResponse } from "@/models/AuthResponse";

export interface IAuthClient {
  login: (username: string, password: string) => Promise<AuthResponse | undefined>;
  register: (username: string, password: string) => Promise<AuthResponse |undefined>;
}
