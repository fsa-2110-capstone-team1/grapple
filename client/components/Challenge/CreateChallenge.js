import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import {
  Grid,
  Box,
  TextField,
  Button,
  Typography,
  MenuItem,
  Slider,
  FormControlLabel,
  Switch,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";

const CreateChallenge = ({ method }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: {
      errors,
      isSubmitting,
      isSubmitSuccessful,
      isDirty,
      dirtyFields,
      invalid,
    },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    console.log("submitted");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          width: "80vw",
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
            <Typography variant="h4">
              {method === "create" ? "Create New Challenge" : "Edit Challenge"}
            </Typography>
          </Grid>

          {/* FORM */}
          <Grid item xs={5} sx={{ width: "80%" }}>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ marginTop: 2 }}
              id="challenge-form"
            >
              <Grid container spacing={3} direction="column">
                {/* FORM FIELDS */}
                <Grid item>
                  <TextField
                    id="name"
                    label="Name"
                    variant="outlined"
                    autoFocus
                    {...register("name", {
                      required: "Required field",
                    })}
                    error={!!errors?.name}
                    helperText={errors?.name ? errors.name.message : null}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    multiline
                    {...register("description", { required: "Required field" })}
                    error={!!errors?.description}
                    helperText={
                      errors?.description ? errors.description.message : null
                    }
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="imageUrl"
                    label="Image URL"
                    variant="outlined"
                    {...register("imageUrl")}
                    error={!!errors?.imageUrl}
                    helperText={
                      errors?.imageUrl ? errors.imageUrl.message : null
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="type"
                    select
                    label="Type"
                    defaultValue="targetNumber"
                    helperText={
                      "Choose between a target number (e.g.: run 50 miles in 30 days) or checklist (e.g.: watch this list of movies)"
                    }
                    required
                    {...register("type", { required: true })}
                    error={!!errors?.type}
                  >
                    <MenuItem value={"targetNumber"}>Target Number</MenuItem>
                    <MenuItem value={"checklist"}>Checklist</MenuItem>
                  </TextField>
                </Grid>

                <Grid item container spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={6}>
                      <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          formState: { errors },
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            minDateTime={new Date()}
                            label="Start Date"
                            fullWidth
                            // onError={<span> "Not valid" </span>}
                            error={!!errors?.startDate}
                            minDateMessage="Date should not be in the past"
                            errorText="This is an error message."
                            // helperText={
                            //   errors?.startDate
                            //     ? errors.startDate.message
                            //     : null
                            // }
                            required
                            renderInput={(params) => (
                              <TextField {...params} required />
                            )}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Controller
                        name="endDate"
                        control={control}
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          formState: { errors },
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            minDateTime={new Date()}
                            label="End Date"
                            fullWidth
                            error={!!errors?.endDate}
                            helperText={
                              errors?.endDate ? errors.endDate.message : null
                            }
                            required
                            renderInput={(params) => (
                              <TextField {...params} required />
                            )}
                          />
                        )}
                      />
                    </Grid>
                  </LocalizationProvider>
                </Grid>

                <Grid item>
                  <Typography id="target-goal" gutterBottom>
                    Target Goal
                  </Typography>
                  <Grid item container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        id="targetNumber"
                        label="Number"
                        type="number"
                        variant="outlined"
                        {...register("targetNumber", { required: true })}
                        error={!!errors?.targetNumber}
                        helperText={
                          errors?.targetNumber
                            ? errors.targetNumber.message
                            : null
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                    <Grid item xs={9}>
                      <TextField
                        id="targetUnit"
                        label="Unit"
                        variant="outlined"
                        {...register("targetUnit", { required: true })}
                        error={!!errors?.targetUnit}
                        helperText={
                          errors?.targetUnit
                            ? errors.targetUnit.message
                            : "e.g. miles, books, days, etc"
                        }
                        fullWidth
                        required
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item>
                  <Typography id="difficulty-slider" gutterBottom>
                    Difficulty Level*
                  </Typography>
                  <Slider
                    aria-label="Difficulty"
                    defaultValue={3}
                    // getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    step={1}
                    marks={[
                      {
                        value: 1,
                        label: "Super Easy",
                      },
                      {
                        value: 2,
                        label: "Easy",
                      },
                      {
                        value: 3,
                        label: "Normal",
                      },
                      {
                        value: 4,
                        label: "Hard",
                      },
                      {
                        value: 5,
                        label: "Super Hard",
                      },
                    ]}
                    min={1}
                    max={5}
                    {...register("difficultyRating", { required: true })}
                    required
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Private challenge (by invite only)"
                  />
                </Grid>

                {/* BUTTONS */}
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
                      {method === "create" ? "Create" : "Update"}
                    </LoadingButton>
                  ) : (
                    <Button
                      size="medium"
                      fullWidth
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || !isDirty}
                      form="challenge-form"
                    >
                      {method === "create" ? "Create" : "Update"}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default CreateChallenge;
