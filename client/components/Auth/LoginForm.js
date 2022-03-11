import React, { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
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

const LoginForm = ({ path }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

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
    const authed = await dispatch(authenticate(data, "login"));
    //authed === undefined when authenticate is successful
    //navigate back to where they were before login
    if (!authed) {
      navigate(path || location.pathname);
    }
  };

  useEffect(
    () => isSubmitSuccessful && alert("Submitted!"),
    [isSubmitSuccessful]
  );

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "80vw",
          border: "1px solid black",
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
          }}
        >
          <Grid item xs={1}>
            <Typography variant="h4">Log In</Typography>
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
            <Grid item xs={6} textAlign={"center"} sx={{ width: "60%" }}>
              <Button variant="contained" fullWidth>
                Log in with Google
              </Button>
            </Grid>
            <Grid item xs={6} sx={{ width: "60%" }}>
              <Button variant="contained" fullWidth>
                Log in with Facebook
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
              sx={{ marginTop: 2 }}
              id="login-form"
            >
              <Grid container spacing={3} direction="column">
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    label="Email"
                    variant="outlined"
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
                <Grid item xs={12} sm={12}>
                  <TextField
                    id="password"
                    label="Password"
                    type="password"
                    variant="outlined"
                    {...register("password", { required: "Required field" })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} textAlign={"center"}>
                  {isSubmitting ? (
                    <LoadingButton
                      size="medium"
                      fullWidth
                      loading
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="outlined"
                    >
                      Log In
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
                      Log In
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

          <Grid item xs={1}>
            <Typography variant="body2">
              No account? No problem, sign up <Link to="/signup">here</Link>!
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default LoginForm;
