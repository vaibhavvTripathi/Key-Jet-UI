"use client";
import CopyToClipboard from "@/components/CopyToClipboard";
import { usePollRoomsAsync } from "@/hooks/raceHooks";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../context/AuthContext";
import { RaceStatus } from "@/models/Room";
import WaitingForPatnerScreen from "@/components/WaitingForPatnerScreen";
import IntermediateRaceScreen from "@/components/IntermediateRaceScreen";
import StartCompetingScreen from "@/components/StartCompetingScreen";
import { useRouter } from "next/navigation";
const Room = () => {
  const { getToken } = useContext(AuthContext);
  const { data: roomData } = usePollRoomsAsync(
    getToken(),
    Cookies.get("roomId")
  );
  const router = useRouter();
  if (roomData?.currentStatus === RaceStatus.ENDED) {
    router.push("/compete/results");
  }
  return (
    <>
      {roomData?.currentStatus === RaceStatus.INITIALISED && (
        <WaitingForPatnerScreen />
      )}
      {roomData?.currentStatus === RaceStatus.INTERMEDIATE &&
        roomData.startTime && (
          <IntermediateRaceScreen
            timeLeft={
              new Date(roomData?.startTime).getTime() - new Date().getTime()
            }
          />
        )}
      {roomData && roomData?.currentStatus === RaceStatus.STARTED && roomData.startTime && (
        <StartCompetingScreen
          timeLeft={
            new Date().getTime() - new Date(roomData?.startTime).getTime()
          }
          playerInfo={roomData.players}
        />
      )}
    </>
  );
};

export default Room;
