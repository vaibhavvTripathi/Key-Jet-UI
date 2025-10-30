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
  CircularProgress,
  InputAdornment,
  IconButton,
  Alert,
  Fade,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLogin } from "@/hooks/authHooks";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { handleAxiosError } from "@/utill";
import { useRouter } from "next/navigation";

const Login = () => {
  const { mutateAsync, isError, isPending } = useLogin();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ username: "", password: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const validateForm = (username: string, password: string): boolean => {
    const errors = { username: "", password: "" };
    let isValid = true;

    if (!username || username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username") as string;
    const password = data.get("password") as string;

    // Validate form
    if (!validateForm(username, password)) {
      toast.error("Please fix the form errors");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Logging in...");

    try {
      await mutateAsync({ username, password });

      // Only show success if we reach this point (no error thrown)
      toast.dismiss(loadingToast);
      setIsSuccess(true);

      // Navigate after a brief delay to show success state
      setTimeout(() => {
        router.push("/compete");
      }, 800);
    } catch (err) {
      // Dismiss loading toast first
      toast.dismiss(loadingToast);
      
      const status = handleAxiosError(err as AxiosError);
      console.log(status);
      
      if (status === 404) {
        toast.error("User doesn't exist. Please register first.");
      } else if (status === 401) {
        toast.error("Invalid credentials. Please try again.");
      } else if (status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        px: 2,
      }}
    >
      <Fade in={true} timeout={600}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", maxWidth: 450 }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main", width: 56, height: 56 }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Log in to continue your racing journey
          </Typography>

          {isSuccess && (
            <Alert
              severity="success"
              icon={<CheckCircleIcon />}
              sx={{ width: "100%", mb: 2 }}
            >
              Login successful! Redirecting to compete...
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: "100%" }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              disabled={isPending || isSuccess}
              error={!!formErrors.username}
              helperText={formErrors.username}
              onChange={() => setFormErrors({ ...formErrors, username: "" })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon color={formErrors.username ? "error" : "action"} />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease",
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              disabled={isPending || isSuccess}
              error={!!formErrors.password}
              helperText={formErrors.password}
              onChange={() => setFormErrors({ ...formErrors, password: "" })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color={formErrors.password ? "error" : "action"} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      disabled={isPending || isSuccess}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  transition: "all 0.3s ease",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox 
                  value="remember" 
                  color="primary" 
                  disabled={isPending || isSuccess}
                />
              }
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2, 
                height: 48,
                position: "relative",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: isPending || isSuccess ? "none" : "translateY(-2px)",
                  boxShadow: isPending || isSuccess ? "none" : 4,
                },
              }}
              disabled={isPending || isSuccess}
            >
              {isPending ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                      position: "absolute",
                      left: "50%",
                      marginLeft: "-12px",
                    }}
                  />
                  <span style={{ opacity: 0 }}>Log In</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  Success
                </>
              ) : (
                "Log In"
              )}
            </Button>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link 
                href="/register" 
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {"Don't have an account? Register"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Login;
