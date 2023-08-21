import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Link,
  Typography,
  Alert,
  Box,
  Avatar,
  Grid,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AuthContext } from "../../context/authContext";
import { useForm } from "../../utility/hooks";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../queries/queries";
import { GraphQLError } from "graphql";

function Login() {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState<GraphQLError[]>([]);
  const { onChange, onSubmit, values } = useForm(loginUserCallBack, {
    email: "",
    password: "",
  });

  async function loginUserCallBack() {
    await loginUser({ variables: values });
  }

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, response) {
      const data = response.data.login;
      context.login({
        token: data.token,
        username: data.user.username,
        id: data.user.id,
        email: data.user.email,
        role: data.user.role,
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
        Sign in
      </Typography>
      <Box component="form" onSubmit={onSubmit} noValidate sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              onChange={onChange}
              margin="normal"
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              onChange={onChange}
              margin="normal"
              variant="outlined"
              required
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
          Login
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/register" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Login;
