import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  CardContent,
  Button,
  Typography,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { updateUser } from "../../store";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../../server/base";
import Switch from "@mui/material/Switch";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import theme from "../../theme";

export const UserSettingsForm = ({ preloadedValues }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: preloadedValues });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Success snackbar
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser(data));
      setSnackbar({
        children: "Your settings successfully updated!",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setSnackbar({
        children: "Settings could not be updated!",
        severity: "error",
      });
    }
  };
  const [newpassword, setNewPassword] = useState(preloadedValues.password);
  const [confirmpassword, setConfirmPassword] = useState(
    preloadedValues.password
  );
  const [cheched, setChecked] = useState(preloadedValues.isPrivate);
  const [googleLogin, setGoogleLogin] = useState(!!preloadedValues.googleId);
  const [facebookLogin, setFacebookLogin] = useState(
    !!preloadedValues.facebookId
  );

  return (
    <div className="profile-container">
      {!!snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
      <CardContent>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ marginTop: 2 }}
          id="user-update-form"
        >
          <Grid container spacing={3} direction="column">
            {/* FORM FIELDS */}
            {!googleLogin && !facebookLogin ? (
              <>
                <Grid item>
                  <TextField
                    id="password"
                    label="New Password"
                    type="password"
                    variant="outlined"
                    defaultValue={newpassword}
                    {...register("password", { required: "Required field" })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                    fullWidth
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="confirmpassword"
                    label="Confirm New Password"
                    type="password"
                    variant="outlined"
                    defaultValue={confirmpassword}
                    {...register("confirmpassword", {
                      required: "Required field",
                      validate: (val) => {
                        if (watch("password") !== val) {
                          errors.password = {};
                          errors.password.message =
                            "Your passwords do no match";
                        }
                      },
                    })}
                    error={!!errors?.password}
                    helperText={
                      errors?.password ? errors.password.message : null
                    }
                    fullWidth
                  />
                </Grid>
              </>
            ) : googleLogin ? (
              <>
              <Grid item>
                <Typography>You logged in with Google account</Typography>
              </Grid>
              </>
            ) : (
              <>
              <Grid item>
                <Typography>You logged in with Facebook account</Typography>
              </Grid>
              </>
            )}

            <Grid item>
              <FormLabel component="legend">Type of your account</FormLabel>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Public</Typography>
                <FormControlLabel
                  id="isPrivate"
                  control={<Switch color="primary" defaultChecked={cheched} />}
                  label="Private"
                  {...register("isPrivate")}
                />
              </Stack>
            </Grid>
            {/* BUTTON */}
            <Grid item>
              <Button
                size="medium"
                fullWidth
                variant="contained"
                type="submit"
                form="user-update-form"
              >
                Update Settings
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="medium"
                fullWidth
                variant="contained"
                type="submit"
                form="user-update-form"
                onClick={() =>
                  navigate(`/users/profile/${preloadedValues.username}`)
                }
              >
                Go back to your Profile
              </Button>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </div>
  );
};
