"use client";
import { AuthContext } from "@/app/context/AuthContext";
import SimpleLineChart from "@/components/LineChart";
import { useQueryResultAsync } from "@/hooks/raceHooks";
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Typography,
  colors,
} from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

const RaceResult = () => {
  const [isWpm, setIsWpm] = useState<boolean>(true);
  const { getToken } = useContext(AuthContext);
  const [payload, setPayload] = useState<{
    token: string | undefined | null;
    roomId: string | undefined | null;
  }>({ token: undefined, roomId: undefined });
  const { data, isLoading, isError } = useQueryResultAsync(
    payload.token,
    payload.roomId
  );
  useEffect(() => {
    setPayload({ token: getToken(), roomId: Cookies.get("roomId") });
  }, []);
  const router = useRouter();
  if (isError) {
    toast.error("Something went wrong");
    router.push("/");
  }
  const winner = data?.players.reduce((max, obj) =>
    max.performance[Math.max(max.performance.length - 1, 0)].wpm >
    obj.performance[Math.max(obj.performance.length - 1, 0)].wpm
      ? max
      : obj
  );
  const playerAWpm = data?.players[0].performance.map((item) => {
    return item.wpm;
  });
  const playerBWpm = data?.players[1].performance.map((item) => {
    return item.wpm;
  });
  const playerARaw = data?.players[0].performance.map((item) => {
    return item.rawSpeed;
  });
  const playerBRaw = data?.players[1].performance.map((item) => {
    return item.rawSpeed;
  });
  const time = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
  ];
  useEffect(() => {
    if (!winner) return;
    toast.success((winner.username as string) + " won");
  }, [winner]);
  if (isLoading) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "fit-content",
            mx: "auto",
            mt: 30,
            gap: 2,
          }}
        >
          <CircularProgress />
          <Typography variant="h6">Loading Results..</Typography>
        </Box>
      </>
    );
  } else {
    return (
      <Container
        sx={{
          height: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 5,
        }}
      >
        <ButtonGroup variant="outlined" aria-label="Basic button group">
          <Button
            sx={{
              background: isWpm ? colors.blueGrey[900] : "default",
              color: isWpm ? colors.grey[200] : "default",
            }}
            onClick={() => setIsWpm(true)}
          >
            Wpm
          </Button>
          <Button
            sx={{
              background: !isWpm ? colors.blueGrey[900] : "default",
              color: !isWpm ? colors.grey[200] : "default",
            }}
            onClick={() => setIsWpm(false)}
          >
            Raw
          </Button>
        </ButtonGroup>
        <SimpleLineChart
          line1={{
            val: (isWpm ? playerAWpm : playerARaw) as number[],
            label: data?.players[0].username as string,
          }}
          line2={{
            val: (isWpm ? playerBWpm : playerBRaw) as number[],
            label: data?.players[1].username as string,
          }}
          x={{ val: time, label: "time" }}
          y={isWpm ? "wpm" : "raw"}
        />
      </Container>
    );
  }
};

export default RaceResult;
