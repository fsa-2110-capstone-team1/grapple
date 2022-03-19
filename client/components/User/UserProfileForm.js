import React, { useState } from "react";
import { useDispatch } from "react-redux";
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

export const UserProfileForm = ({ preloadedValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preloadedValues });

  const dispatch = useDispatch();
  //Success snackbar
  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);
  const [fileName, setFileName] = useState("");
  const [imageUrl, setImageUrl] = useState(preloadedValues.image);

  const onSubmit = async (data) => {
    try {
      data.image = imageUrl;
      await dispatch(updateUser(data));
      setSnackbar({
        children: "Your profile successfully updated!",
        severity: "success",
      });
    } catch (err) {
      console.log(err);
      setSnackbar({
        children: "Profile could not be updated!",
        severity: "error",
      });
    }
  };

  const onChange = async (e) => {
    console.log("e", e);
    const file = e.target.files[0];
    const storage = getStorage();
    const fileRef = ref(storage, file.name);
    setFileName(file.name);
    await uploadBytes(fileRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
    await getDownloadURL(ref(storage, file.name)).then((url) => {
      setImageUrl(url);
    });
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
                <label htmlFor="image">
                  <input
                    style={{ display: "none" }}
                    id="image"
                    name="image"
                    type="file"
                    {...register("image")}
                    onChange={onChange}
                  />
                  <Button
                    size="medium"
                    fullWidth
                    variant="contained"
                    component="span"
                  >
                    Update Photo
                  </Button>
                  <div className="file-name">
                    {fileName.length > 0 ? fileName : null}
                  </div>
                </label>
              </Grid>
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
                  helperText={errors?.lastName ? errors.lastName.message : null}
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
                  helperText={errors?.username ? errors.username.message : null}
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
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9._%+-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  error={!!errors?.email}
                  helperText={errors?.email ? errors.email.message : null}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <TextField
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  {...register("password", { required: "Required field" })}
                  error={!!errors?.password}
                  helperText={errors?.password ? errors.password.message : null}
                  fullWidth
                />
              </Grid>

              {/* <Grid item>
                <TextField
                  id="image"
                  label="Image URL"
                  variant="outlined"
                  {...register("image")}
                  error={!!errors?.image}
                  helperText={errors?.image ? errors.image.message : null}
                  fullWidth
                />
              </Grid> */}
              <FormLabel component="legend">Type of your account</FormLabel>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>Public</Typography>
                <FormControlLabel
                  id="isPrivate"
                  control={<Switch color="primary" />}
                  label="Private"
                  {...register("isPrivate")}
                />
              </Stack>
              {/* BUTTON */}
              <Grid item>
                <Button
                  size="medium"
                  fullWidth
                  variant="contained"
                  type="submit"
                  form="user-update-form"
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
