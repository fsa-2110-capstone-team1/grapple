import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Button,
  Typography,
  Toolbar,
  Drawer,
  Divider,
  CssBaseline,
} from "@mui/material";
import Searcher from "./Searcher";
import PaginationFooter from "./PaginationFooter.js";
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
