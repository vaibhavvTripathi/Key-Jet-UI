import { AuthClient } from "@/apiClients/AuthService/AuthClient";
import { useMutation } from "@tanstack/react-query";
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
    });
  };