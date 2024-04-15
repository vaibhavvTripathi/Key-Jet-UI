import axios, { AxiosError } from "axios";
import { IRoomClient } from "./IRoomClient";
import { handleAxiosError } from "@/utill";
import { getConfigs } from "@/configmanager/configmanager";
import toast from "react-hot-toast";
import { headers } from "next/dist/client/components/headers";
import Cookies from "js-cookie";
import { IRoom } from "@/models/Room";

export const BASE_URL = getConfigs().urlConfigs.baseurl;
export const RoomClient: IRoomClient = {
  createRoom: async function (token): Promise<string | undefined> {
    try {
      return (
        await axios.post(`${BASE_URL}/room`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      if (status === 409) {
        toast.error("Room already exists");
      } else if (status === 401) {
        toast.error("Please log in");
        Cookies.remove("token");
      } else {
        toast.error("Something went wrong please refresh");
      }
    }
  },
  pollRoomAsync: async function (
    token: string,
    roomId: string
  ): Promise<IRoom | undefined> {
    try {
      return (
        await axios.get(`${BASE_URL}/room/${roomId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      if (status === 404) {
        toast.error("Room doesn't exists");
      } else if (status === 401) {
        toast.error("Please log in");
        Cookies.remove("token");
      } else {
        toast.error("Something went wrong please refresh");
      }
    }
  },
  joinRoomAsync: async function (token: string, roomId: string): Promise<void> {
    try {
      return (
        await axios.post(`${BASE_URL}/room/user/${roomId}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        })
      ).data;
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      if (status === 404) {
        toast.error("Room doesn't exists");
      } else if (status === 401) {
        toast.error("Please log in");
        Cookies.remove("token");
      } else {
        toast.error("Something went wrong please refresh");
      }
    }
  },
  postUserPerformance: async function (
    token: string,
    roomId: string,
    performance: Result
  ): Promise<void> {
    try {
      await axios.post(`${BASE_URL}/room/performance/${roomId}`, performance, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      if (status === 404) {
        toast.error("Room doesn't exists");
      } else if (status === 401) {
        toast.error("Please log in");
        Cookies.remove("token");
      } else {
        toast.error("Something went wrong please refresh");
      }
    }
  },
  getRaceResultAsync: async function (
    token: string,
    roomId: string
  ): Promise<IRoom | undefined> {
    try {
      const resp: IRoom = (
        await axios.get(
          `${BASE_URL}/room/results/${roomId}`,

          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      ).data;
      return resp;
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      if (status === 404) {
        toast.error("Room doesn't exists");
      } else if (status === 401) {
        toast.error("Please log in");
        Cookies.remove("token");
      } else {
        toast.error("Something went wrong please refresh");
      }
    }
  },
};
