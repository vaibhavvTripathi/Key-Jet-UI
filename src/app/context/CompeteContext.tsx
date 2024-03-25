import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TypeContext } from "./TypeContext";
import { Color } from "@/models/Letter";
import { List } from "@mui/material";
import Word from "@/models/Word";
import io from "socket.io-client";
import { Socket } from "socket.io-client";
import { Participant, Room } from "@/models/Participant";
import { useRouter } from "next/navigation";
import { Process } from "@/models/competeModel";

export interface CompeteContext {
  raceStarted: Process;
  roomId: string;
  createRoom: () => Promise<void>;
  joinRoom: (userId: string, roomId: string) => Promise<void>;
  currRoom: Room;
  handleRaceData: (
    time: number,
    DisplayTypedParagraph: Array<Word>
  ) => Promise<void>;
  endRace: () => void;
  intitRace : () => void;
}

export const CompeteContext = createContext<CompeteContext>({
  raceStarted: Process.RACE_NOT_STARTED,
  roomId: "",
  createRoom: async () => {},
  joinRoom: async (userId: string) => {},
  currRoom: { total_participants: 0, participants: [] },
  handleRaceData: async (
    time: number,
    DisplayTypedParagraph: Array<Word>
  ) => {},
  endRace: () => {},
  intitRace : () => {}
});

const CompetitionProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<Result[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currRoom, setCurrRoom] = useState<Room>({
    total_participants: 0,
    participants: [],
  });
  const [raceStarted, setRaceStarted] = useState<Process>(
    Process.RACE_NOT_STARTED
  );
  const router = useRouter();
  const [roomId, setRoomId] = useState<string>("");
  useEffect(() => {
    if (socket === null) {
      setSocket(io("http://localhost:8000"));
    }
  }, [socket]);
  const createRoom = async () => {
    if (socket === null) return;
    await socket.emit("create_room");
  };

  const joinRoom = async (userId: string, roomId: string) => {
    if (socket === null) return;
    socket.emit("join_room", {
      roomId: roomId,
      name: userId,
    });
    //
  };
  const handleRaceData = async (
    time: number,
    DisplayTypedParagraph: Array<Word>
  ) => {
    let green = 0;
    DisplayTypedParagraph.forEach((word) => {
      let flag: boolean = false;
      word.forEach((letter) => {
        if (letter.color !== Color.GREEN) {
          flag = true;
        }
      });
      if (!flag) {
        green++;
      }
    });
    const dataPacket = {
      name: sessionStorage.getItem("userId") ?? "",
      cw: green,
      speed: green / time,
      roomId: sessionStorage.getItem("roomId"),
    };
    socket?.emit("racing_currently", dataPacket);
  };

  const endRace = () => {
    setRaceStarted(Process.RACE_ENDED);
    router.push("/compete/result");
   
  };

  const intitRace = () => {
    setRaceStarted(Process.RACE_NOT_STARTED);
  }
  // socket event handlers
  socket?.on("get_room_id", (data) => {
    sessionStorage.setItem("roomId", data.id);
    setRoomId(data.id);
  });

  socket?.on("handle_error", (data) => {
    alert(data.message);
  });

  socket?.on("signal_start", (data) => {
    console.log(data.message);
    setRaceStarted(Process.RACE_STARTED);
  });

  socket?.on("room_info", (data) => {
    setCurrRoom(data);
    setRaceStarted(Process.RACE_INITIALIZING);
  });

  const ContextValue = {
    raceStarted,
    roomId,
    createRoom,
    joinRoom,
    currRoom,
    handleRaceData,
    endRace,
    intitRace
  };

  return (
    <CompeteContext.Provider value={ContextValue}>
      {children}
    </CompeteContext.Provider>
  );
};

export default CompetitionProvider;
