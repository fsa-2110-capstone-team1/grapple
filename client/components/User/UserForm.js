import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Grid,
  CartText,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Box,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import dateFormat from "dateformat";
import { useForm, Controller } from "react-hook-form";
import updateUser from "../../store";

export const UserProfileForm = ({preloadedValues}) => {

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      dirtyFields,
      invalid,
    },
    reset
  } = useForm({ defaultValues : preloadedValues});

  
  //Email validation
  const isValidEmail = (email) =>
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  const handleEmailValidation = (email) => {
    console.log("ValidateEmail was called with", email);

    const isValid = isValidEmail(email);

    const validityChanged =
      (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log("Fire tracker with", isValid ? "Valid" : "Invalid");
    }

    return isValid;
  };

  //Success snackbar
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const onSubmit = async (data) => {
    try {
      await dispatch(updateUser(data));
      setSnackbar({
        children: "Your profile successfully updated!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        children: "Profile could not be updated!",
        severity: "error",
      });
    }
  };

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
          <Grid item xs={12} sx={{ width: "100%" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ marginTop: 2 }}
              id="user-update-form"
            >
              <Grid container spacing={3} direction="column">
                {/* FORM FIELDS */}
                <Grid item>
                  <TextField
                    id="firstName"
                    label="First Name"
                    variant="outlined"
                    autoFocus
                    {...register("firstName", {
                      required: "Required field",
                    })}
                    error={!!errors?.firstName}
                    helperText={
                      errors?.firstName ? errors.firstName.message : null
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="lastName"
                    label="Last Name"
                    variant="outlined"
                    autoFocus
                    {...register("lastName", {
                      required: "Required field",
                    })}
                    error={!!errors?.lastName}
                    helperText={
                      errors?.lastName ? errors.lastName.message : null
                    }
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item>
                  <TextField
                    id="username"
                    label="Username"
                    variant="outlined"
                    autoFocus
                    {...register("username", {
                      required: "Required field",
                    })}
                    error={!!errors?.username}
                    helperText={
                      errors?.username ? errors.username.message : null
                    }
                    fullWidth
                    required
                  />
                </Grid>
                
                <Grid item>
                  <TextField
                    id="email"
                    label="Email address"
                    variant="outlined"
                    autoFocus
                    {...register("email", {
                      required: "Required field",
                      validate: handleEmailValidation,
                    })}
                    error={!!errors?.email}
                    helperText={
                      errors?.email ? errors.email.message : null
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="image"
                    label="Image URL"
                    variant="outlined"
                    {...register("image")}
                    error={!!errors?.image}
                    helperText={errors?.image ? errors.image.message : null}
                    fullWidth
                  />
                </Grid>
                {/* BUTTON */}
                <Grid item>
                  <Button
                    size="medium"
                    fullWidth
                    variant="contained"
                    type="submit"
                    form="challenge-form"
                  >
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </CardContent>
        </div>
  );
};
