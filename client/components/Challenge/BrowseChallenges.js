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

function ResponsiveDrawer() {
  // const path = useLocation().pathname.split("/").pop();
//const drawerWidth = 200;
  let challenges = useSelector((state) => state.challenges);
  //let currentChallenges;
  // let sortedChallenges
  //let toSortChallenges;

  ///Filter from URL
  //const path = useLocation().pathname.split("/");

  // console.log("path", path);
  // console.log('tester', path[3])

  // let preChallenges = challenges;
  // let prepChallenges;
  // if (challenges.length) {
  //   if (
  //     (path[2] === "filter" && path[3] === "1") ||
  //     path[3] === "2" ||
  //     path[3] === "3" ||
  //     path[3] === "4" ||
  //     path[3] === "5"
  //   ) {
  //     preChallenges = challenges.filter(
  //       (challenge) => challenge.difficulty === path[3] * 1
  //     );
  //   }

  //   if (
  //     (path[2] === "filter" && path[4] === "physical") ||
  //     path[4] === "food" ||
  //     path[4] === "misc" ||
  //     path[4] === "sleep" ||
  //     path[4] === "mental"
  //   ) {
  //     prepChallenges = preChallenges.filter(
  //       (challenge) => challenge.category === path[4]
  //     );
  //   }

  //   if (
  //     ((path[2] === "sortby" && path[3] === "name") ||
  //       path[3] === "difficulty" ||
  //       path[3] === "category") &&
  //     (path[4] === "asc" || path[4] === "desc")
  //   ) {
  //   }

  //   if (
  //     ((path[5] === "sortby" && path[6] === "name") ||
  //       path[6] === "difficulty" ||
  //       path[6] === "category") &&
  //     (path[7] === "asc" || path[7] === "desc")
  //   ) {
  //   }

  //   console.log(preChallenges);
  // }

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
              {challenges?.map((challenge) => (
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
          // challengesPerPage={challengesPerPage}
          // totalPosts={toSortChallenges.length}
          // currentPage={currentPage}
          // setCurrentPage={setCurrentPage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResponsiveDrawer;
