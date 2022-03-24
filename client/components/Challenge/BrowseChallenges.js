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
  const challenges = useSelector((state) => state.challenges);

  //filtering
  const [filters, setFilters] = useState({});
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  useEffect(() => {
    setFilteredChallenges(challenges);
  }, [challenges]);

  //sorting
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  //pagination calculations
  const [activePage, setActivePage] = useState(1);
  const challengesPerPage = 9;
  const count = filteredChallenges.length;
  const totalPages = Math.ceil(count / challengesPerPage);

  const [calculatedChallenges, setCalculatedChallenges] = useState([]);
  useEffect(() => {
    console.log(filteredChallenges);
    setCalculatedChallenges(
      filteredChallenges.slice(
        (activePage - 1) * challengesPerPage,
        activePage * challengesPerPage
      )
    );
  }, [sort, filters, filteredChallenges]);

  return (
    <Box sx={{ minHeight: "100vh" }}>
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
        <Grid item xs={10}>
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
            count={count}
            challengesPerPage={challengesPerPage}
            totalPages={totalPages}
            setActivePage={setActivePage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BrowseChallenges;
