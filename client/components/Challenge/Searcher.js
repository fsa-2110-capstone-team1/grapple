import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import { makeStyles, createStyles, ThemeProvider } from "@mui/styles";
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
  return (
    <ThemeProvider theme={theme}>
      <Popper
        {...props}
        placement="bottom"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: "400px" }}
      />
    </ThemeProvider>
  );
};

export default function Searcher({ data }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    setOptions(data.map((option) => option.name));
  }, [data]);

  return (
    <div className="search">
      <Stack spacing={2}>
        <Autocomplete
          freeSolo
          disableClearable
          options={data.map((option) => option.name)}
          renderOption={(option, index) => (
            <div key={index}>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const goTo = data.find((user) => user.name === option.key);
                  console.log(goTo);
                  window.location.href = `/challenges/${goTo.id}`;
                }}
              >
                <p>{option.key}</p>
              </span>
            </div>
          )}
          PopperComponent={CustomPopper}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for Challenges"
              InputProps={{
                ...params.InputProps,
                type: "search",
              }}
            />
          )}
          getOptionLabel={(option) => `${option}`}
        />
      </Stack>
    </div>
  );
}
