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
  LinearProgress,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useLogin, useRegister } from "@/hooks/authHooks";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { handleAxiosError } from "@/utill";
import { AxiosError } from "axios";

const Register = () => {
  const { mutateAsync, isError, isPending } = useRegister();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formErrors, setFormErrors] = useState({ 
    username: "", 
    password: "", 
    confirmPassword: "" 
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^a-zA-Z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 40) return "error";
    if (strength < 70) return "warning";
    return "success";
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 40) return "Weak";
    if (strength < 70) return "Medium";
    return "Strong";
  };

  const validateForm = (username: string, password: string, confirmPassword: string): boolean => {
    const errors = { username: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!username || username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
      isValid = false;
    } else if (username.trim().length > 20) {
      errors.username = "Username must be less than 20 characters";
      isValid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      errors.username = "Username can only contain letters, numbers, and underscores";
      isValid = false;
    }

    if (!password || password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
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
    const confirmPassword = data.get("confirmPassword") as string;

    // Validate form
    if (!validateForm(username, password, confirmPassword)) {
      toast.error("Please fix the form errors");
      return;
    }

    // Show loading toast
    const loadingToast = toast.loading("Creating your account...");

    try {
      await mutateAsync({ username, password });

      // Only show success if we reach this point (no error thrown)
      toast.dismiss(loadingToast);
      toast.success("Account created successfully! Redirecting...");
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
      
      if (status === 409) {
        toast.error("Username already taken. Please choose another.");
      } else if (status === 400) {
        toast.error("Invalid input. Please check your details.");
      } else if (status === 500) {
        toast.error("Server error. Please try again later.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      setIsSuccess(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
    setFormErrors({ ...formErrors, password: "" });
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
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Join the racing community and start competing
          </Typography>

          {isSuccess && (
            <Alert
              severity="success"
              icon={<CheckCircleIcon />}
              sx={{ width: "100%", mb: 2 }}
            >
              Account created successfully! Redirecting...
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
              helperText={formErrors.username || "3-20 characters, letters, numbers, and underscores only"}
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
              autoComplete="new-password"
              disabled={isPending || isSuccess}
              error={!!formErrors.password}
              helperText={formErrors.password}
              onChange={handlePasswordChange}
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
                      onClick={() => setShowPassword(!showPassword)}
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
            {passwordStrength > 0 && (
              <Box sx={{ width: "100%", mt: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                  <Typography variant="caption" color="text.secondary">
                    Password Strength:
                  </Typography>
                  <Typography variant="caption" color={`${getPasswordStrengthColor(passwordStrength)}.main`}>
                    {getPasswordStrengthText(passwordStrength)}
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={passwordStrength} 
                  color={getPasswordStrengthColor(passwordStrength)}
                  sx={{ height: 6, borderRadius: 1 }}
                />
              </Box>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              disabled={isPending || isSuccess}
              error={!!formErrors.confirmPassword}
              helperText={formErrors.confirmPassword}
              onChange={() => setFormErrors({ ...formErrors, confirmPassword: "" })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon color={formErrors.confirmPassword ? "error" : "action"} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      disabled={isPending || isSuccess}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
                  <span style={{ opacity: 0 }}>Register</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircleIcon sx={{ mr: 1 }} />
                  Success
                </>
              ) : (
                "Create Account"
              )}
            </Button>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link 
                href="/login" 
                variant="body2"
                sx={{
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {"Already have an account? Login"}
              </Link>
            </Box>
          </Box>
        </Box>
      </Fade>
    </Box>
  );
};

export default Register;
