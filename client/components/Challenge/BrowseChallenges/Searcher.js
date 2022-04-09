import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Stack, Autocomplete, Popper } from "@mui/material";
import theme from "../../../theme";

// const useStyles = makeStyles((theme) =>
//   createStyles({
//     root: {
//       "& .MuiAutocomplete-listbox": {
//         height: "180px",
//         fontSize: 18,
//         padding: "15px",
//       },
//     },
//   })
// );

const CustomPopper = (props) => {
  return (
    <Popper
      {...props}
      placement="bottom"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: "400px" }}
    />
  );
};

export default function Searcher({ data }) {
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setOptions(data.map((option) => option.name));
  }, [data]);

  return (
    <div className="search">
      <Stack spacing={2}>
        <Autocomplete
          freeSolo
          disableClearable
          options={data.map((option) => JSON.stringify(option))}
          renderOption={(option, index) => {
            const challenge = JSON.parse(option.key);
            return (
              <div key={challenge.id}>
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigate(`/challenges/details/${challenge.id}`);
                  }}
                >
                  <p>{challenge.name}</p>
                </span>
              </div>
            );
          }}
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
