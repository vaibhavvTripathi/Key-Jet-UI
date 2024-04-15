import { RoomClient } from "@/apiClients/RoomService/RoomClient";
import { useMutation, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";

export const useCreateRoom = () => {
  return useMutation({
    mutationFn: (token: string) => RoomClient.createRoom(token),
    onSuccess: (data) => {
      if (!data) return;
      if (data) Cookies.set("roomId", data);
    },
  });
};

export const usePollRoomsAsync = (
  token: string | null | undefined,
  roomId: string | undefined | null
) => {
  return useQuery({
    queryFn: () => RoomClient.pollRoomAsync(token as string, roomId as string),
    queryKey: ["room", roomId],
    enabled: Boolean(token && roomId),
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });
};

export const useQueryResultAsync = (
  token: string | null | undefined,
  roomId: string | undefined | null
) => {
  return useQuery({
    queryFn: () => RoomClient.getRaceResultAsync(token as string, roomId as string),
    queryKey: ["result", roomId],
    enabled: Boolean(token && roomId),
  });
};


export const usePostPerformance = () => {
  return useMutation({
    mutationFn: ({
      performance,
      token,
      roomId,
    }: {
      performance: Result;
      token: string;
      roomId: string;
    }) => RoomClient.postUserPerformance(token, roomId, performance),
  });
};
