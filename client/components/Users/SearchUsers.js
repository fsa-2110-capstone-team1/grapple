import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import { makeStyles, createStyles } from "@mui/styles";
import { spacing } from "@mui/system/";
import theme from "../../theme";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        height: "180px",
        fontSize: 18,
        padding: "15px",
      },
    },
  })
);

const CustomPopper = (props) => {
  const classes = useStyles();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

export default function SearchUsers({ data }) {
  return (
    <div className="search">
      <Stack spacing={2} sx={{ width: 300, height: 100 }}>
        <Autocomplete
          freeSolo
          // classes={classes}
          id="free-solo-2-demo"
          disableClearable
          options={data.map((option) => option.username)}
          renderOption={(option, index) => (
            <React.Fragment key={index}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  window.location.href = `/users/profile/${option.key}`;
                }}
              >
                <p>{option.key}</p>
              </span>
            </React.Fragment>
          )}
          PopperComponent={CustomPopper}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for Users"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
        />
      </Stack>
    </div>
  );
}
