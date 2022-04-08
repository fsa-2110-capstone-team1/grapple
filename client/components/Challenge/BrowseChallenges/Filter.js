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
import { useNavigate, useLocation, useParams } from "react-router-dom";
import theme from "../../../theme";

const Filter = ({
  challenges,
  filters,
  setFilters,
  filteredChallenges,
  setFilteredChallenges,
  setActivePage,
}) => {
  //update filtered challenges every time a new filter is added
  useEffect(() => {
    setFilteredChallenges(filterChallenges(challenges, filters));
  }, [filters]);

  const navigate = useNavigate();

  const location = useLocation().pathname;
  const params = useParams();

  if (params.attr === "0") {
    navigate(`/challenges`);
  }

  function filterChallenges(challenges, filters) {
    if (!Object.keys(filters).length) return challenges;

    return challenges.filter((challenge) => {
      return Object.keys(filters).every((attribute) => {
        const value = challenge[attribute];
        const searchValue = filters[attribute];

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

  const handleFilter = (value, attribute) => {
    setActivePage(1);
    navigate(`/challenges/${attribute}=${value}`);
    if (value) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [attribute]: value,
      }));
    } else {
      setFilters((prevFilters) => {
        const updatedFilters = { ...prevFilters };
        delete updatedFilters[attribute];

        return updatedFilters;
      });
    }
  };

  return (
    <Box>
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="difficulty">Difficulty</InputLabel>
          <Select
            labelId="difficulty"
            id="difficulty-select"
            value={filters["difficulty"] || 0}
            label="difficulty"
            onChange={(e) => handleFilter(e.target.value, "difficulty")}
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
          <InputLabel id="category">Category</InputLabel>
          <Select
            labelId="category"
            id="category-select"
            value={filters["category"] || 0}
            label="category"
            onChange={(e) => handleFilter(e.target.value, "category")}
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
      <Box sx={{ mt: 3 }}>
        <FormControl fullWidth>
          <InputLabel id="status">Status</InputLabel>
          <Select
            labelId="status"
            id="status-select"
            value={filters["status"] || 0}
            label="status"
            onChange={(e) => handleFilter(e.target.value, "status")}
          >
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={"Not Started"}>Not Started</MenuItem>
            <MenuItem value={"In Progress"}>In Progress</MenuItem>
            <MenuItem value={"Ended"}>Ended</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Filter;
