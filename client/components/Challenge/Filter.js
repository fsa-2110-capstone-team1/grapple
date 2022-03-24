import React, { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

function Filter({
  challenges,
  filters,
  setFilters,
  filteredChallenges,
  setFilteredChallenges,
  setActivePage,
}) {
  //   const filteredChallenges = filterChallenges(challenges, filters);

  function filterChallenges(challenges, filters) {
    if (!Object.keys(filters).length) return challenges;

    return challenges.filter((row) => {
      return Object.keys(filters).every((accessor) => {
        const value = row[accessor];
        const searchValue = filters[accessor];

        if (typeof value === "string") {
          return value.toLowerCase().includes(searchValue.toLowerCase());
        }

        if (typeof value === "boolean") {
          return (
            (searchValue === "true" && value) ||
            (searchValue === "false" && !value)
          );
        }

        if (typeof value === "number") {
          return value == searchValue;
        }

        return false;
      });
    });
  }

  const handleFilter = (value, accessor) => {
    setActivePage(1);

    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [accessor]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[accessor];

        return updatedFilters;
      });
    }
  };

  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={difficulty}
            value={0}
            label="difficulty"
            // onChange={handleChangeDiff}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={4}>4</MenuItem>
            <MenuItem value={5}>5</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label1">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label1"
            id="demo-simple-select1"
            // value={category}
            value={0}
            label="category"
            // onChange={handleChangeCat}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={"mental"}>Mental</MenuItem>
            <MenuItem value={"physical"}>Physical</MenuItem>
            <MenuItem value={"sleep"}>Sleep</MenuItem>
            <MenuItem value={"food"}>Food</MenuItem>
            <MenuItem value={"misc"}>Misc</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Filter;
