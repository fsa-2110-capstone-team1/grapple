import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
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
import theme from "../../../theme";

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
  const navigate = useNavigate();
  const handleReset = () => {
    setFilteredChallenges(challenges.filter((c) => c.status !== "Ended"));
    setFilters({});
    setSort({});
    navigate("/challenges");
  };

  return (
    <Box sx={{ height: "100vh", width: "100%" }}>
      <Box sx={{ display: "flex", height: "70vh", width: "100%" }}>
        <Toolbar />
        {/* Toolbar to bump drawer down by the nav bar height */}
        <Stack spacing={2} sx={{ mt: 2, width: "100%" }}>
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Search
            </Typography>
            <Searcher data={challenges} />
          </Box>
          <Divider />
          <Box>
            <Typography variant="h6">Sort By</Typography>
            <Sort
              setActivePage={setActivePage}
              sort={sort}
              setSort={setSort}
              filteredChallenges={filteredChallenges}
              setFilteredChallenges={setFilteredChallenges}
              challenges={challenges}
              filters={filters}
            />
          </Box>

          <Divider />
          <Box>
            <Typography variant="h6">Filter By</Typography>
            <Filter
              challenges={challenges}
              filters={filters}
              setFilters={setFilters}
              filteredChallenges={filteredChallenges}
              setFilteredChallenges={setFilteredChallenges}
              setActivePage={setActivePage}
            />
          </Box>

          <Divider sx={{ paddingTop: 1, paddingBottom: 1 }} />
          <Button variant={"contained"} onClick={() => handleReset()}>
            Reset
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default FilterDrawer;
