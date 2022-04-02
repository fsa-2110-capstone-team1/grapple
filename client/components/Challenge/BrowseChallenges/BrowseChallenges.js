import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import PaginationFooter from "./PaginationFooter";
import ChallengeCard from "../ChallengeCard";
import FilterDrawer from "./FilterDrawer";
import theme from "../../../theme";

function BrowseChallenges() {
  const challenges = useSelector((state) => state.challenges);

  //filtering
  const [filters, setFilters] = useState({});
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  useEffect(() => {
    setFilteredChallenges(challenges.filter((c) => c.status !== "Ended"));
  }, [challenges]);

  //sorting
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  //pagination calculations
  const [activePage, setActivePage] = useState(1);
  const challengesPerPage = 12;
  const count = filteredChallenges.length;
  const totalPages = Math.ceil(count / challengesPerPage);

  const [calculatedChallenges, setCalculatedChallenges] = useState([]);
  useEffect(() => {
    setCalculatedChallenges(
      filteredChallenges.slice(
        (activePage - 1) * challengesPerPage,
        activePage * challengesPerPage
      )
    );
  }, [sort, filters, filteredChallenges, activePage]);

  //scroll to top at page load or paginate
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, activePage, filters, sort]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        // backgroundColor: theme.palette.braun.main,
      }}
    >
      <Grid container>
        {/* Filter drawer */}
        <Grid item xs={2}>
          <FilterDrawer
            challenges={challenges}
            setActivePage={setActivePage}
            filters={filters}
            setFilters={setFilters}
            filteredChallenges={filteredChallenges}
            setFilteredChallenges={setFilteredChallenges}
            sort={sort}
            setSort={setSort}
          />
        </Grid>
        {/* grid with cards (right side) */}
        <Grid item xs={10} sx={{ mt: "25px" }}>
          <Grid container sx={{ minHeight: "70vh" }}>
            <Grid item xs={1} />
            <Grid item xs={10} container>
              {calculatedChallenges?.map((challenge) => (
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
            totalPages={totalPages}
            setActivePage={setActivePage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BrowseChallenges;
