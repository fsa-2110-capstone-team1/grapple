import * as React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import Popper from "@mui/material/Popper";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& .MuiAutocomplete-listbox": {
        height: "180px",
        // width: "100px",
        //  backgroundColor: "#4ab5a3",
        fontSize: 18,
        // color:'white'
        // padding-left: "20px",
        padding: "15px",
      },
    },
  })
);

const CustomPopper = (props) => {
  const classes = useStyles();
  return <Popper {...props} className={classes.root} placement="bottom" />;
};

export default function Searcher({ data }) {
  return (
    <div className="search">
      <Stack
        spacing={2}
        // sx={{ width: 300, height: 100 }}
      >
        <Autocomplete
          freeSolo
          // classes={classes}
          // id="free-solo-2-demo"
          disableClearable
          options={data.map((option) => option.name)}
          renderOption={(option) => (
            <React.Fragment>
              <span
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const goTo = data.find((user) => user.name === option.key);
                  // const user = publicUsers?.find((user) => user.id === friendId);
                  console.log(goTo);
                  // console.log(option.key)
                  window.location.href = `/challenges/${goTo.id}`;
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
