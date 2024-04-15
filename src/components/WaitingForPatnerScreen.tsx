import CopyToClipboard from "@/components/CopyToClipboard";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import waiting from "../Images/undraw_loading_re_5axr.svg";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const WaitingForPatnerScreen = () => {
  const [roomId, setRoomId] = useState<string>("");
  useEffect(() => {
    const roomId = Cookies.get("roomId");
    if (!roomId) {
      toast.error("Kuch toh gadbad hai");
      return;
    }
    setRoomId(roomId);
  }, []);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 5,
      }}
    >
      <Image
        style={{ display: "block" }}
        src={waiting}
        height={300}
        width={200}
        alt={"waiting"}
      ></Image>
      <CopyToClipboard text={roomId ?? ""} />
      <Typography variant="h4" sx={{mt:2}}>
        Waiting for your friend to join via this link
      </Typography>
    </Box>
  );
};

export default WaitingForPatnerScreen;
