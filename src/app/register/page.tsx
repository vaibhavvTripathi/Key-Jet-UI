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
import { useLogin, useRegister } from "@/hooks/authHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/utill";
import { AxiosError } from "axios";

const Register = () => {
  const { mutateAsync, isError, isPending } = useRegister();
  const router = useRouter();
  if (isError) toast.error("user already exists ");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      await mutateAsync({
        username: data.get("username") as string,
        password: data.get("password") as string,
      });
      router.push("/compete");
    } catch (err) {
      const status = handleAxiosError(err as AxiosError);
      console.log(status);
      if (status === 409) {
        toast.error("User already exists");
      } else toast.error("something went wrong");
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
        Register
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
          disabled={isPending}
        >
          Register
        </Button>
        <Link href="/login" variant="body2">
          {"Already have an account? Login"}
        </Link>
      </Box>
    </Box>
  );
};

export default Register;
