import { AuthClient } from "@/apiClients/AuthService/AuthClient";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { userInfo } from "os";

export const useLogin = () => {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => AuthClient.login(username, password),
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      Cookies.set("token", data.token);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => AuthClient.register(username, password),
    onSuccess: (data) => {
      if (!data) {
        return;
      }
      Cookies.set("token", data.token);
    },
  });
};
