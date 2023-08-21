import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Link,
  Typography,
  TextField,
  Button,
  Alert,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import { REGISTER_USER } from "../../queries/queries";
import { useMutation } from "@apollo/client";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utility/hooks";
import { GraphQLError } from "graphql";

function Register() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState<GraphQLError[]>([]);

  async function registerUserCallback() {
    const res = await registerUser({ variables: values });
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, response) {
      const data = response.data.login;
      context.login({
        token: data.token,
        username: data.username,
        id: data.id,
        email: data.email,
      });
      navigate("/movies");
    },
    onError({ graphQLErrors }) {
      setErrors([...graphQLErrors]);
    },
    variables: values,
  });

  if (loading) return <div>Loading</div>;

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
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="username"
              required
              fullWidth
              id="username"
              label="Username"
              autoFocus
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              onChange={onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              onChange={onChange}
            />
          </Grid>
        </Grid>
        {errors.map(function (error) {
          return <Alert severity="error">{error.message}</Alert>;
        })}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Register;
