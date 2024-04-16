"use client";
import { AccountCircle } from "@mui/icons-material";
import LockIcon from "@mui/icons-material/Lock";

import {
    Box,
    Button,
    Container,
    InputAdornment,
    Link,
    TextField,
    Typography,
    makeStyles,
    styled,
} from "@mui/material";

import React, { useState } from "react";

const StyledLink = styled(Link)(({ theme }) => ({
    color: "white",
    textDecoration: "none",
    transition: "color 0.3s ease",
    "&:hover": {
        color: "#a6a2a2",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a slight box shadow on hover
    },
}));

const Page = () => {
    var [isLogin, setLogin] = useState<boolean>(false);

    return (
        <Container
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: '2em'
            }}
        >
                <Box m={"2em"}>
                    {
                        <Typography variant="h1">
                            {isLogin ? "Login" : "Register"}
                        </Typography>
                    }
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "2.2em",
                        width: "23em",
                        p: "1em",
                    }}
                >
                    <TextField
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockIcon />
                                </InputAdornment>
                            ),
                        }}
                        fullWidth
                    />
                    <Button variant="contained">
                        {isLogin ? "Login" : "Register"}
                    </Button>
                </Box>
                <Box>
                    <Typography variant="body2" color={"#a6a2a2"}>
                        {isLogin
                            ? "Not a member yet ? "
                            : "Already a member ?  "}
                        <StyledLink
                            href="#"
                            fontSize={13}
                            onClick={() => setLogin(!isLogin)}
                        >
                            {isLogin ? " Register" : " Login"}
                        </StyledLink>
                    </Typography>
                </Box>
        </Container>
    );
};

export default Page;
