import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useAuthenticator } from "../hooks/user";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI, meAPI } from "../apis/authen";
import { useCookies } from "react-cookie";

type FormValues = {
  email: string;
  password: string;
};

const validation = yup
  .object({
    email: yup
      .string()
      .required("This field is required")
      .email("Email is invalid"),
    password: yup
      .string()
      .required("This field is required")
      .min(6, "Please enter more than 6 characters"),
  })
  .required();

const Authen = () => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    resolver: yupResolver(validation),
  });
  const { handleSubmit, register } = formMethods;

  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setUser, user } = useAuthenticator();
  const navigate = useNavigate();
  const [cookie, setCookie] = useCookies(["access_token"]);

  const onSubmit = async (data: FormValues) => {
    const response = await loginAPI(data as unknown as any);
    if ("error" in response) {
      setError(true);
    } else {
      setSuccess(true);
      setCookie("access_token", (response as any)?.tokenData?.token);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);

  useEffect(() => {
    const some = async () => {
      const response = await meAPI();
      setUser(response);
      navigate("/");
    };
    if (success) {
      some();
    }
  }, [success, user]);

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <Box
          display="flex"
          flexDirection="column"
          maxWidth={300}
          margin="0 auto"
        >
          <TextField
            type="email"
            label="Email"
            margin="normal"
            {...register("email")}
          />
          <TextField
            type="password"
            label="Password"
            margin="normal"
            {...register("password")}
          />
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Login
            </Button>
            <Typography>
              Don't have an account? <Link to="/register">Register</Link>
            </Typography>
            <Typography
              sx={{
                textAlign: "center",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => navigate("/")}
            >
              Homepage
            </Typography>
          </Box>
        </Box>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={3000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Login success
        </Alert>
      </Snackbar>
      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={() => setError(false)}
      >
        <Alert
          onClose={() => setError(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Error when login user!
        </Alert>
      </Snackbar>
    </Box>
  );
};
export default Authen;
