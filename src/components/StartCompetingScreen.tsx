import React, { useContext, useEffect, useState } from "react";
import { useCounter } from "@/utills/useCounter";
import { useRouter } from "next/navigation";
import Type from "./Type";
import { ResultContext } from "@/app/context/ResultContext";
import { usePostPerformance } from "@/hooks/raceHooks";
import { AuthContext } from "@/app/context/AuthContext";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { Player } from "@/models/Room";
import { Box, Typography } from "@mui/material";
import CarComponent from "./CarComponent";
type StartCompetingScreenType = {
  timeLeft: number;
};
const StartCompetingScreen = ({
  timeLeft,
  playerInfo,
}: {
  timeLeft: number;
  playerInfo: Player[];
}) => {
  const [counter, setCounter] = useState<number>(Math.floor(timeLeft / 1000));
  const router = useRouter();
  const handleFinishRace = () => {
    router.push("/compete/results");
  };
  const { results } = useContext(ResultContext);
  const { getToken } = useContext(AuthContext);
  const { mutateAsync } = usePostPerformance();
  useEffect(() => {
    const token = getToken();
    const roomId = Cookies.get("roomId");
    if (counter >= 30 || !token || !roomId || results.length == 0) return;
    const interval = setInterval(() => {
      mutateAsync({ token, roomId, performance: results[results.length - 1] });
    }, 1000);
    return () => clearInterval(interval);
  }, [results, counter]);
  useEffect(() => {
    toast.success(`Race started !!`);
  }, []);
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {playerInfo.map((item, index) => {
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                width: "800px",
                mx: "auto",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" sx={{ textAlign: "center" }}>
                {item.username}
              </Typography>
              <CarComponent
                result={item.performance[item.performance.length - 1]}
              />
            </Box>
          );
        })}
      </Box>

      <Type
        handleFinishRace={handleFinishRace}
        initStart={true}
        initialTimeCount={Math.floor(timeLeft / 1000)}
        allowToFinish={true}
      />
    </>
  );
};

export default StartCompetingScreen;
