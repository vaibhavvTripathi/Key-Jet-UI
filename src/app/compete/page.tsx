"use client";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Container,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import { useCreateRoom } from "@/hooks/raceHooks";
import Cookies from "js-cookie";
import { RoomClient } from "@/apiClients/RoomService/RoomClient";

const Compete = () => {
  const { getToken } = useContext(AuthContext);
  const [newRoomId, setNewRoomId] = useState<string>("");
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
    setToken(token);
  }, []);

  const { mutateAsync, isPending: disableCreateRoom } = useCreateRoom();
  const handleCreateRoom = async () => {
    if (!token) return;
    await mutateAsync(token);
    const newRoomId = Cookies.get("roomId");
    if (!token || !newRoomId) return;
    await RoomClient.joinRoomAsync(token, newRoomId);
    router.push("/room");
  };

  const handleEnterRoom = async () => {
    Cookies.set("roomId", newRoomId);
    setNewRoomId("");
    if (!token || !newRoomId) return;
    await RoomClient.joinRoomAsync(token, newRoomId);
    router.push("/room");
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          mt: 20,
          mx: "auto",
          p: 5,
          borderRadius: "20px",
          border: "1px solid grey",
          width: '40%'
        }}
      >
        <Typography variant="h3" sx={{ textAlign: "center" }}>
          Enter a new room
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2, justifyContent: 'center', padding: '1em' }}>
          <TextField
            onChange={(e) => setNewRoomId(e.target.value)}
            value={newRoomId}
            label="Enter Room Id"
          />
          <IconButton onClick={handleEnterRoom} sx={{width: '2.4em'}}>
            <SendIcon />
          </IconButton>
        </Box>

        <Divider />
        <Button
          onClick={handleCreateRoom}
          variant="contained"
          disabled={disableCreateRoom}
          sx={{margin: '1em', borderRadius: '8px', height: '4em'}}
        >
          + Create a room
        </Button>
      </Box>
    </>
  );
};

export default Compete;
