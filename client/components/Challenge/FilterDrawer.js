import React, { useEffect, useState } from "react";
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
import Sort from "./Sort";
import Filter from "./Filter";

function FilterDrawer({
  challenges,
  filters,
  setFilters,
  filteredChallenges,
  setFilteredChallenges,
  setActivePage,
  sort,
  setSort,
  sortedChallenges,
  setSortedChallenges,
}) {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "20vw",
            padding: "30px",
          },
        }}
        open
      >
        <>
          {/* Toolbar to bump drawer down by the nav bar height */}
          <Toolbar />
          <Grid container direction="column" spacing={2} sx={{ mt: 2 }}>
            <Grid item>
              <Typography variant="h6" sx={{ mb: 1 }}>
                Search
              </Typography>
              <Searcher data={challenges} />
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant="h6">Sort By</Typography>
              <Sort
                setActivePage={setActivePage}
                sort={sort}
                setSort={setSort}
                filteredChallenges={filteredChallenges}
                setFilteredChallenges={setFilteredChallenges}
              />
            </Grid>
            <Grid item>
              <Divider />
            </Grid>
            <Grid item>
              <Typography variant="h6">Filter By</Typography>
              <Filter
                challenges={challenges}
                filters={filters}
                setFilters={setFilters}
                filteredChallenges={filteredChallenges}
                setFilteredChallenges={setFilteredChallenges}
                setActivePage={setActivePage}
              />
            </Grid>
          </Grid>
        </>
      </Drawer>
    </Box>
  );
}

export default FilterDrawer;
