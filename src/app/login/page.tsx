"use client";
import {
  Box,
  Avatar,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Link,
} from "@mui/material";
import React from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLogin } from "@/hooks/authHooks";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utill";
import { useRouter } from "next/navigation";

const Login = () => {
  const { mutateAsync, isError } = useLogin();
  const router= useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      await mutateAsync({
        username: data.get("username") as string,
        password: data.get("password") as string,
      });
      router.push("/compete")
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      console.log(status)
      if (status === 404) {
        toast.error("User doesn't exists");
      }
    }
  };
  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Log in
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Log In
        </Button>
        <Link href="/register" variant="body2">
          {"Don't have an account? Register"}
        </Link>
      </Box>
    </Box>
  );
};

export default Login;
