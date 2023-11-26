"use client;";
import { Box, Button, Typography } from "@mui/material";
import React, { useContext } from "react";
import { TextField } from "@mui/material";
import { CompeteContext } from "@/app/context/CompeteContext";
import { useState, useEffect } from "react";
import {useTheme} from "@mui/material";
import { tokens } from "@/theme";

const RaceGate = () => {
  const { createRoom, roomId, joinRoom } = useContext(CompeteContext);
  const [name, setName] = useState<string>("");
  const [room_id, setRoomId] = useState<string>("");
  
  useEffect(() => {
    setRoomId(roomId);
  }, [roomId]);

  const handleJoinRoom = async () => {
    if (room_id === "" || name === "") return;
    const user = name + "_" + (Math.random() * 10).toString().substring(5);
    sessionStorage.setItem("userId", user);
    sessionStorage.setItem("roomId", room_id);
    await joinRoom(user, room_id);
  };
  return (
    <>
      <Box
        sx={{
          border: "1px solid grey",
          mt: 10,
          width: "50%",
          mx: "auto",
          p: 5,
          borderRadius: "20px",
        }}
      >
        <Typography variant="h3" sx={{ py: 2 }}>
          Enter Room Id 🚗..
        </Typography>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          label="Enter your name"
          sx={{ width: "100%" }}
        />
        <TextField
          value={room_id}
          onChange={(e) => setRoomId(e.target.value)}
          label="Enter the roomId"
          sx={{ width: "100%", mt: 2 }}
        />
        <Button
          onClick={handleJoinRoom}
          variant="contained"
          sx={{ width: "100%", my: 2 }}
        >
          Join this room
        </Button>
        <Typography variant="h2" sx={{ py: 2, textAlign: "center" }}>
          OR
        </Typography>
        <Button
          onClick={createRoom}
          variant="contained"
          sx={{ width: "100%", my: 2 }}
        >
          Generate a Room Id
        </Button>
      </Box>
    </>
  );
};

export default RaceGate;
