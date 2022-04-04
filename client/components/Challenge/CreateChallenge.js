import React, { useEffect } from "react";
import { useNavigate, useLocation, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
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
  Snackbar,
  Alert,
} from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { LoadingButton } from "@mui/lab";
import SaveIcon from "@mui/icons-material/Save";
import { addNewChallenge, updateChallenge } from "../../store";

const CreateChallenge = ({ method }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: challengeId } = useParams();

  const fullChallenges = useSelector((state) => state.challenges);

  let theChallenge = fullChallenges;
  if (fullChallenges.length > 0) {
    fullChallenges.find((challenge) => challenge.id === challengeId * 1);
    theChallenge = fullChallenges.find(
      (challenge) => challenge.id === challengeId * 1
    );
  }
  // console.log(theChallenge)

  if (!theChallenge && method !== "create") {
    return <h1>Sorry we are unable to edit this challenge</h1>;
  }

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

  //Success snackbar
  const [snackbar, setSnackbar] = React.useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const onSubmit = async (data) => {
    try {
      const { challenge } = await dispatch(
        method === "create"
          ? 
          addNewChallenge({
              ...data,
              category: data.category === "0" ? "misc" : data.category,
            })

          : 
          updateChallenge({
              ...data,
              category: data.category === "0" ? "misc" : data.category,
            })
            
      );
      navigate(`/challenges/${challenge.id}`);
    } catch (err) {
      setSnackbar({
        children: "Challenge could not be added!",
        severity: "error",
      });
    }
  };

  return (
    <>
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
                    defaultValue={theChallenge ? theChallenge.name : ""}
                    fullWidth
                    required
                  />
                </Grid>

                <Grid item>
                  <TextField
                    id="category"
                    select
                    label="Category"
                    defaultValue="0"
                    // defaultValue={
                    //   theChallenge ? theChallenge.category : "mental"
                    // }
                    required
                    {...register("category", { required: true })}
                    error={!!errors?.category}
                    fullWidth
                    sx={{ width: "100%" }}
                  >
                    <MenuItem value={"0"} disabled hidden>
                      Choose a category
                    </MenuItem>
                    <MenuItem value={"mental"}>Mental</MenuItem>
                    <MenuItem value={"physical"}>Physical</MenuItem>
                    <MenuItem value={"food"}>Food</MenuItem>
                    <MenuItem value={"sleep"}>Sleep</MenuItem>
                    <MenuItem value={"misc"}>Misc</MenuItem>
                  </TextField>
                </Grid>

                <Grid item>
                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    defaultValue={theChallenge ? theChallenge.description : ""}
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
                    id="image"
                    label="Image URL"
                    variant="outlined"
                    {...register("imageUrl")}
                    defaultValue={theChallenge ? theChallenge.image : "0"}
                    error={!!errors?.imageUrl}
                    helperText={
                      errors?.imageUrl ? errors.imageUrl.message : null
                    }
                    fullWidth
                  />
                </Grid>

                <Grid item container spacing={2}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Grid item xs={6}>
                      <Controller
                        name="startDateTime"
                        control={control}
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          formState: { errors },
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            minDate={new Date().setHours(0, 0, 0, 0)}
                            label="Start Date"
                            fullWidth
                            error={!!errors?.startDate}
                            minDateMessage="Date should not be in the past"
                            errorText="This is an error message."
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
                        name="endDateTime"
                        control={control}
                        rules={{ required: true }}
                        render={({
                          field: { onChange, value },
                          formState: { errors },
                        }) => (
                          <DatePicker
                            onChange={onChange}
                            value={value}
                            minDate={new Date().setHours(0, 0, 0, 0)}
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
                  <TextField
                    id="goalType"
                    select
                    label="Goal Type"
                    defaultValue="total"
                    helperText={
                      "Choose between a 'total' challenge (e.g. run 100 miles in a month) or a 'daily' challenge (e.g. meditate everyday for a month)"
                    }
                    required
                    {...register("goalType", { required: true })}
                    error={!!errors?.goalType}
                  >
                    <MenuItem value={"total"}>Total</MenuItem>
                    <MenuItem value={"daily"}>Daily</MenuItem>
                  </TextField>
                </Grid>

                <Grid item>
                  <Typography id="target-goal" gutterBottom>
                    Goal
                  </Typography>
                  <Grid item container spacing={2}>
                    <Grid item xs={3}>
                      <TextField
                        id="targetNumber"
                        label="Number"
                        type="number"
                        InputProps={{ inputProps: { min: 0 } }}
                        variant="outlined"
                        defaultValue={
                          theChallenge ? theChallenge.targetNumber : "0"
                        }
                        {...register("targetNumber", { required: true })}
                        error={!!errors?.targetNumber}
                        helperText={
                          errors?.targetNumber
                            ? errors.targetNumber.message
                            : "For 'total' type, this sould be the overall total goal. For 'daily' type, this should be the goal per day."
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
                        defaultValue={
                          theChallenge ? theChallenge.targetUnit : "0"
                        }
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
                    // defaultValue={3}
                    // getAriaValueText={valuetext}
                    defaultValue={theChallenge ? theChallenge.difficulty : 3}
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
                    {...register("difficulty", { required: true })}
                    required
                  />
                </Grid>

                <Grid item>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Private challenge (by invite only)"
                    {...register("isPrivate")}
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
    </>
  );
};

export default CreateChallenge;
