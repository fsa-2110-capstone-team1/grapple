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
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";

export const UserProfileForm = ({ preloadedValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: preloadedValues });
  const navigate = useNavigate();
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
  const [progress, setProgress] = React.useState(50);

  useEffect(() => {
    setProgress(50);
  }, [fileName]);

  const onChange = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const fileRef = ref(storage, file.name);
    setFileName(file.name);
    await uploadBytes(fileRef, file).then((snapshot) => {
    });
    await getDownloadURL(ref(storage, file.name)).then((url) => {
      setImageUrl(url);
      setProgress(100);
    });
  };

  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
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
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ marginTop: 2 }}
          id="user-update-form"
        >
          <Grid container spacing={3} direction="column">
            {/* FORM FIELDS */}
            <Grid item>
              <Grid container spacing={3}>
                <Grid item xs={6}>
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

                <Grid item xs={6}>
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

                <Grid item xs={6}>
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

                <Grid item xs={6}>
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
              </Grid>
            </Grid>
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
                  Upload Profile Picture
                </Button>
                <Typography
                  variant="h8"
                  className="file-name"
                  sx={{ margin: "50px" }}
                >
                  {fileName.length > 0 ? fileName : null}
                  {fileName.length > 0 ? (
                    <LinearProgressWithLabel value={progress} />
                  ) : null}
                </Typography>
              </label>
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
                Update Profile
              </Button>
            </Grid>
            <Grid item>
              <Button
                size="medium"
                fullWidth
                variant="contained"
                type="submit"
                form="user-update-form"
                onClick={() => navigate(`/users/profile/${preloadedValues.username}`)}
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
