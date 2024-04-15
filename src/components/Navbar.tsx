import { Box, Button, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import { sleep } from "../utills/sleep";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import { ColorModeContext } from "@/theme";
import Link from "next/link";
import { useTheme } from "@mui/material";
import { tokens } from "@/theme";
import { usePathname, useRouter } from "next/navigation";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Tooltip } from "@mui/material";

const Navbar = () => {
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const { mode, toggleColorMode } = useContext(ColorModeContext);
  const theme = useTheme();
  const color = tokens(theme.palette.mode);

  const router = useRouter();
  const pathname = usePathname();
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
        my: 5,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => router.push("/")}
      >
        <BoltIcon
          sx={{
            fontSize: "2.5em",
            color: "tex1.dark",
            filter: "drop-shadow(0 0 5px) brightness(150%)",
          }}
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
          ml: 4,
          borderRadius: "10px",
          display: "flex",
        }}
      >
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            background:
              pathname === "/" || pathname === "/results"
                ? color.primary[700]
                : "inherit",
            padding: "10px",
            borderRadius: "10px",
          }}
          href={"/"}
        >
          <Typography sx={{ color: color.greyAccent[100] }} variant="h4">
            Practice
          </Typography>
        </Link>
        <Link
          style={{
            textDecoration: "none",
            color: "white",
            background:
              pathname.startsWith("/compete") || pathname.startsWith("/room")
                ? color.primary[700]
                : "inherit",
            padding: "10px",
            borderRadius: "10px",
          }}
          href={"/compete"}
        >
          <Typography sx={{ color: color.greyAccent[100] }} variant="h4">
            Compete
          </Typography>
        </Link>
      </Box>
      <Box
        sx={{
          mr: 10,
          border: "1px solid ",
          borderColor: "text3.light",
          borderRadius: "10px",
          px: 1,
        }}
      >
        <Tooltip title="Leaderboard">
          <IconButton>
            <GroupsIcon sx={{ color: "text3.light" }} />
          </IconButton>
        </Tooltip>

        {/* <Tooltip title="Mode">
          <IconButton onClick={toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <LightModeIcon />
            ) : (
              <DarkModeIcon sx={{ color: "text3.light" }} />
            )}
          </IconButton>
        </Tooltip> */}
      </Box>
    </Box>
  );
};

export default Navbar;
