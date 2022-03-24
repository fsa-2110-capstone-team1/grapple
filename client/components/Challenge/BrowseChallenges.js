import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import Searcher from "./Searcher";
import { useSelector } from "react-redux";
import { Grid, Box, Button, Typography } from "@mui/material";
import PaginationFooter from "./PaginationFooter.js";
import ChallengeCard from "./ChallengeCard";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FilterDrawer from "./FilterDrawer";

function BrowseChallenges() {
  // const path = useLocation().pathname.split("/").pop();
  const challenges = useSelector((state) => state.challenges);

  // Pagination calculations
  const [activePage, setActivePage] = useState(1);
  const [filters, setFilters] = useState({});
  const rowsPerPage = 9;
  const filteredRows = filterRows(challenges, filters);
  // const count = challenges.length;
  const count = filteredRows.length;
  const totalPages = Math.ceil(count / rowsPerPage);
  // const calculatedRows = challenges.slice(
  const calculatedRows = filteredRows.slice(
    (activePage - 1) * rowsPerPage,
    activePage * rowsPerPage
  );

  function filterRows(rows, filters) {
    if (!Object.keys(filters).length) return rows;

    return rows.filter((row) => {
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

  const handleSearch = (value, accessor) => {
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
      <Grid container>
        {/* Filter drawer */}
        <Grid item xs={2}>
          <FilterDrawer challenges={challenges} />
        </Grid>
        {/* grid with cards (right side) */}
        <Grid item xs={10}>
          <Grid container>
            <Grid item xs={1} />
            <Grid item xs={10} container>
              {calculatedRows?.map((challenge) => (
                <Grid
                  item
                  key={challenge.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  container
                >
                  <ChallengeCard key={challenge.id} challenge={challenge} />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={1} />
          </Grid>
          <PaginationFooter
            activePage={activePage}
            count={count}
            rowsPerPage={rowsPerPage}
            totalPages={totalPages}
            setActivePage={setActivePage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BrowseChallenges;
