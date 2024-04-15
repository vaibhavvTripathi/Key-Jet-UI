import { IRoom } from "@/models/Room";

export interface IRoomClient {
  createRoom: (token: string) => Promise<string | undefined>;
  pollRoomAsync: (token: string, roomId: string) => Promise<IRoom | undefined>;
  joinRoomAsync: (token: string, roomId: string) => Promise<void>;
  postUserPerformance: (
    token: string,
    roomId: string,
    performance: Result
  ) => Promise<void>;
  getRaceResultAsync: (
    token: string,
    roomId: string
  ) => Promise<IRoom | undefined>;
}
