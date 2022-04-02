import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from "@mui/icons-material/Save";
import { authenticate } from "../../store";

import theme from "../../theme";
import FacebookLoginComponent from "./FacebookLoginComponent";
import GoogleLoginComponent from "./GoogleLoginComponent";

const AuthForm = ({ path }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const method = location.pathname.substring(1) || "signup"; //login or signup

  const authError = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    watch,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      dirtyFields,
    },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const authed = await dispatch(authenticate(data, method));
    if (authed.auth.username) {
      navigate(`/users/profile/${authed.auth.username}`);
    }
  };

  return (
    <>
      <Box sx={{ mt: "15vh" }}></Box>
      <Box
        sx={{
          width: "80vw",
          // border: '1px solid black',
          margin: "auto",
          padding: 5,
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent={"center"}
          alignItems={"center"}
          spacing={3}
          sx={{
            width: 1,
            color: theme.palette.white.main,
          }}
        >
          <Grid item xs={1}>
            <Typography variant="h4">
              {method === "login" ? "Log In" : "Sign Up"}
            </Typography>
          </Grid>

          <Grid
            item
            xs={4}
            direction={"column"}
            container
            spacing={3}
            alignItems={"center"}
            sx={{ width: "100%", pb: 2 }}
          >
            <Grid item xs={6} sx={{ width: "60%" }}>
              <GoogleLoginComponent />
            </Grid>

            <Grid item xs={6} sx={{ width: "60%" }}>
              <FacebookLoginComponent />
            </Grid>
            <Grid item xs={6} sx={{ width: "60%" }}>
              <Button
                variant="contained"
                fullWidth
                href="https://www.strava.com/oauth/authorize?client_id=80097&redirect_uri=http://localhost:8080&response_type=code&scope=read_all,activity:read_all"
              >
                Connect with Strava
              </Button>
            </Grid>
          </Grid>

          <Grid item sx={{ width: "100%" }} textAlign={"center"}>
            <Divider variant="middle"> OR </Divider>
          </Grid>

          <Grid item xs={5} sx={{ width: "60%" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                marginTop: 2,
              }}
              id="login-form"
            >
              <Grid
                container
                spacing={3}
                direction="column"

                // sx={{ color: theme.palette.white.main }}
              >
                <Grid item>
                  <TextField
                    inputProps={{ style: { color: theme.palette.white.main } }}
                    InputLabelProps={{
                      style: { color: theme.palette.white.main },
                    }}
                    // sx={{
                    //   backgroundColor: theme.palette.grey.main,
                    // }}
                    id="email"
                    label="Email"
                    variant="filled"
                    autoFocus
                    {...register("email", {
                      required: "Required field",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    inputProps={{ style: { color: theme.palette.white.main } }}
                    InputLabelProps={{
                      style: { color: theme.palette.white.main },
                    }}
                    // sx={{
                    //   backgroundColor: theme.palette.grey.main,
                    // }}
                    id="password"
                    label="Password"
                    type="password"
                    variant="filled"
                    {...register("password", { required: "Required field" })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                    fullWidth
                  />
                </Grid>
                {method === "signup" ? (
                  <Grid item container spacing={2}>
                    <Grid item xs={6}>
                      <TextField
                        inputProps={{
                          style: { color: theme.palette.white.main },
                        }}
                        InputLabelProps={{
                          style: { color: theme.palette.white.main },
                        }}
                        // sx={{
                        //   backgroundColor: theme.palette.grey.main,
                        // }}
                        id="firstName"
                        label="First Name"
                        variant="filled"
                        {...register("firstName", {
                          required: "Required field",
                        })}
                        error={!!errors?.firstName}
                        helperText={
                          errors?.firstName ? errors.firstName.message : null
                        }
                        fullWidth
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        inputProps={{
                          style: { color: theme.palette.white.main },
                        }}
                        InputLabelProps={{
                          style: { color: theme.palette.white.main },
                        }}
                        // sx={{
                        //   backgroundColor: theme.palette.grey.main,
                        // }}
                        id="lastName"
                        label="Last Name"
                        variant="filled"
                        {...register("lastName", {
                          required: "Required field",
                        })}
                        error={!!errors?.lastName}
                        helperText={
                          errors?.lastName ? errors.lastName.message : null
                        }
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                ) : (
                  ""
                )}

                <Grid item>
                  {isSubmitting ? (
                    <LoadingButton
                      size="medium"
                      fullWidth
                      loading
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="outlined"
                    >
                      {method === "login" ? "Log In" : "Sign Up"}
                    </LoadingButton>
                  ) : (
                    <Button
                      size="medium"
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || !isDirty}
                      form="login-form"
                    >
                      {method === "login" ? "Log In" : "Sign Up"}
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  {authError && authError.response && (
                    <div> {authError.response.data} </div>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>

          {method === "login" ? (
            <Grid item xs={1}>
              <Typography variant="body2">
                No account? No problem, sign up{" "}
                <Typography
                  component={Link}
                  to="/signup"
                  color="inherit"
                  variant="inherit"
                >
                  here!
                </Typography>
              </Typography>
            </Grid>
          ) : (
            <Typography variant="body2">
              Have an account? Login{" "}
              <Typography
                component={Link}
                to="/login"
                color="inherit"
                variant="inherit"
              >
                here!
              </Typography>
            </Typography>
          )}
        </Grid>
      </Box>
      <Box sx={{ mb: "5vh" }}></Box>
    </>
  );
};

export default AuthForm;
