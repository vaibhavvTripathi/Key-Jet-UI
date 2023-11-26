"use client";
import { CompeteContext } from "@/app/context/CompeteContext";
import { Box, Paper, Typography, colors } from "@mui/material";
import React, { useContext } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "@/theme";

const RealtimePlayerUpdates = ({ timeCount }: { timeCount: number }) => {
  const { currRoom } = useContext(CompeteContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          //
          borderRadius: "20px",
          my: 5,
          alignItems: "center",
          width: "fit-content",
          mx: "auto",
          flexDirection: "column",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            mt: 2,
            fontWeight: 600,

            pb: 1,
          }}
        >
          👑 Scoreboard
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 5,
            borderRadius: "20px",
            p: 2,

            alignItems: "center",
            width: "fit-content",
            mx: "auto",
          }}
        >
          <Box
            sx={{
              px: 5,
              py: 2,
              borderRadius: "10px",
              border: `1px solid ${colors.greyAccent[400]}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography variant="h3">
              {currRoom.total_participants >= 1
                ? "⛹ " + currRoom?.participants[0]?.name.split("_")[0]
                : "--"}
            </Typography>
            <Typography variant="subtitle1">
              Total Words :{" "}
              <span style={{ fontSize: "2em", color: colors.greenAccent[600] }}>
                {currRoom.total_participants >= 1
                  ? currRoom?.participants[0]?.cw
                  : 0}
              </span>
            </Typography>
            <Typography variant="subtitle1">
              Current Speed :{" "}
              <span style={{ fontSize: "2em", color: colors.greenAccent[600] }}>
                {currRoom.total_participants >= 1
                  ? Math.ceil(currRoom?.participants[0]?.speed * 60)
                  : 0}
              </span>{" "}
              wpm
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Typography variant="h3">
              {timeCount}
              <span style={{ fontSize: "0.75em", color: "grey" }}>s</span>
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 600, color: colors.greyAccent[300] }}
            >
              elapsed untill now
            </Typography>
          </Box>
          <Box
            sx={{
              px: 5,
              py: 2,
              borderRadius: "10px",
              border: `1px solid ${colors.greyAccent[400]}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "left",
            }}
          >
            <Typography variant="h3">
              {currRoom.total_participants === 2
                ? "⛹ " + currRoom?.participants[1]?.name.split("_")[0]
                : "--"}
            </Typography>
            <Typography variant="subtitle1">
              Total Words :{" "}
              <span style={{ fontSize: "2em", color: colors.greenAccent[600] }}>
                {currRoom.total_participants === 2
                  ? currRoom?.participants[1]?.cw
                  : 0}
              </span>
            </Typography>
            <Typography variant="subtitle1">
              Current Speed :{" "}
              <span style={{ fontSize: "2em", color: colors.greenAccent[600] }}>
                {currRoom.total_participants === 2
                  ? Math.ceil(currRoom?.participants[1]?.speed * 60)
                  : 0}
              </span>{" "}
              wpm
            </Typography>
          </Box>
        </Box>
        {/* <Typography>{currRoom.participants[0]?.name}</Typography>
        <Typography>{timeCount}</Typography>
        <Typography>{currRoom.participants[1]?.name}</Typography> */}
      </Box>
    </>
  );
};

export default RealtimePlayerUpdates;
