"use client";
import { Box, IconButton, Typography, colors } from "@mui/material";
import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import toast from "react-hot-toast";

const CopyToClipboard = ({ text }: { text: string }) => {
  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"))
      .catch((error) => toast.error("Failed to copy"));
  };

  return (
    <Box
      sx={{
        p: 2,
        background: colors.blueGrey[900],
        width: "fit-content",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
      <Typography variant="h4">{text}</Typography>
      <IconButton onClick={copyToClipboard}>
        <ContentCopyIcon />
      </IconButton>
    </Box>
  );
};

export default CopyToClipboard;
