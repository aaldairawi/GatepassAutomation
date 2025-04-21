import { LockOutlined } from "@mui/icons-material";
import {
  Container,
  Avatar,
  Typography,
  Box,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { billingUserNames } from "../users/billingEmployees";
import { useAppDispatch } from "../store/configureStore";
import { setUserInLocalStorage } from "../../features/auth/authSlice";

const Login = () => {
  const dispatch = useAppDispatch();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const doesUserNameEnteredExist = billingUserNames.some(
    (user) =>
      user.username === username.toLowerCase() ||
      user.username.toUpperCase() === username.toUpperCase()
  );


  const enteredUserName = billingUserNames.find(
    (element) =>
      element.username === username.toLowerCase() ||
      element.username === username.toUpperCase()
  );

  const passwordForCurrentUserAttempt: boolean =
    enteredUserName?.password === password;

  const handleOnChangeUserName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUsername(event.target.value);
  };

  const handleOnChangePassword = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!enteredUserName) return;
    dispatch(
      setUserInLocalStorage({
        username,
        role: enteredUserName.role,
      })
    );
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 2,
        mt: 20,
        border: "3px solid #393939",
        gap: 2,
        borderRadius: "5px",
      }}
    >
      <Avatar>
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign In
      </Typography>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          placeholder="username"
          fullWidth
          value={username}
          onChange={handleOnChangeUserName}
          sx={{
            outline: "2px solid #393939",
            borderRadius: "5px",
            color: "white",
            mb: 1,
          }}
        />
        <TextField
          type="password"
          placeholder="password"
          fullWidth
          value={password}
          onChange={handleOnChangePassword}
          sx={{
            outline: "2px solid #393939",
            borderRadius: "5px",
            color: "white",
          }}
        />
        <Button
          disabled={!doesUserNameEnteredExist || !passwordForCurrentUserAttempt}
          loading={false}
          type="submit"
          fullWidth
          loadingIndicator={<CircularProgress color="info" size={13} />}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>
      </Box>
    </Container>
  );
};

export default Login;
