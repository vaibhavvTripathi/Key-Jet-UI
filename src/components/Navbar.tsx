import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import { sleep } from "../../utills/sleep";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar = () => {
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const name = "Key Jet";
  useEffect(() => {
    const timer = setInterval(() => {
      setIsUnderline((prev) => !prev);
    }, 350);

    return () => {
      clearInterval(timer);
    };
  }, [isUnderline]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 10,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <BoltIcon
          sx={{ fontSize: "2.5em", color: "tex1.dark",filter: 'drop-shadow(0 0 5px) brightness(150%)'}}
        />
        <Typography variant="h2" sx={{ fontFamily: "'Ubuntu', sans-serif" }}>
          {name.split("").map((item, index) => {
            return (
              <span
                key={index}

                style={{
                  textDecoration:
                    isUnderline && index == name.length - 1
                      ? "underline"
                      : "none",
                      
                }}
              >
                {item}
              </span>
            );
          })}
        </Typography>
      </Box>
      <Box
        sx={{
          mr: 10,
          border: "1px solid ",
          borderColor: "text3.light",
          borderRadius: "10px",
          px: 1
          
        }}
      >
        <IconButton>
          <SettingsIcon sx={{ color: "text3.light"}} />
        </IconButton>
        <IconButton>
          <GroupsIcon sx={{ color: "text3.light" }} />
        </IconButton>
        <IconButton>
          <DarkModeIcon sx={{ color: "text3.light" }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
