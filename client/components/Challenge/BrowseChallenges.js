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
import { Link, NavLink, useLocation } from "react-router-dom";

const drawerWidth = 200;
function ResponsiveDrawer(props) {
  let challenges = useSelector((state) => state.challenges);
  let currentChallenges;
  // let sortedChallenges
  let toSortChallenges;

  ///Filter from URL
  const path = useLocation().pathname.split("/");

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

  //////////////////////Filtering function
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  const handleChangeDiff = (event) => {
    setDifficulty(event.target.value);
    // history.push
  };

  const handleChangeCat = (event) => {
    setCategory(event.target.value);
  };

  let filteredDiffChallenges;
  let filteredCatDiffChallenges;

  if (!difficulty) {
    filteredDiffChallenges = challenges;
  } else
    filteredDiffChallenges = challenges.filter(
      (challenge) => challenge.difficulty === difficulty
    );

  if (!category) {
    filteredCatDiffChallenges = filteredDiffChallenges;
  } else
    filteredDiffChallenges = filteredDiffChallenges.filter(
      (challenge) => challenge.category === category
    );

  if (!filteredCatDiffChallenges) {
    toSortChallenges = filteredDiffChallenges;
  } else toSortChallenges = filteredCatDiffChallenges;

  // console.log(toSortChallenges)

  /////////Sorting functions
  // console.log('j test', toSortChallenges)

  // if (toSortChallenges.length){

  const [sortedChallenges, setSortedChallenges] = useState(toSortChallenges);
  // if (sortedChallenges.length){

  // }

  useEffect(() => {
    setSortedChallenges(toSortChallenges);
  }, [difficulty, category]);

  const [order, setOrder] = useState("ASC");

  const sortedUp = (attr) => {
    let sortedArry;
    {
      sortedArry = [...toSortChallenges].sort((a, b) => {
        if (a[attr] > b[attr]) {
          return 1;
        }
        if (a[attr] < b[attr]) {
          return -1;
        }
        return 0;
      });
    }
    setSortedChallenges(sortedArry);
  };

  const sortedDown = (attr) => {
    let sortedArry;
    {
      sortedArry = [...toSortChallenges].sort((a, b) => {
        if (a[attr] < b[attr]) {
          return 1;
        }
        if (a[attr] > b[attr]) {
          return -1;
        }
        return 0;
      });
    }
    setSortedChallenges(sortedArry);
  };

  /////////Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(12);

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexofFirstChallenge = indexOfLastChallenge - challengesPerPage;

  currentChallenges = sortedChallenges.slice(
    indexofFirstChallenge,
    indexOfLastChallenge
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  // console.log("og Challenge", challenges);
  // console.log("diffFilter", filteredDiffChallenges);
  // console.log("catFilter", toSortChallenges);
  // console.log("toSort", toSortChallenges);
  // console.log("sorted", sortedChallenges);
  // console.log("paginated", currentChallenges);

  // console.log(sortCount);

  ///////Located on the site window

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <h3>Search</h3>
      <Searcher data={challenges} />
      <Divider />
      <h3>Sort By</h3>
      <List>
        {["name", "difficulty", "category"].map((text, index) => (
          <div className="sorting">
            <ListItem>
              <div className="arrow">
                <ArrowCircleUpIcon onClick={() => sortedUp(text)} />
              </div>
              <div className="arrow">
                <ArrowCircleDownIcon onClick={() => sortedDown(text)} />
              </div>
              <ListItemText primary={text} />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
      <>
        <h3>Filter By</h3>
        &nbsp;
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={difficulty}
              label="difficulty"
              onChange={handleChangeDiff}
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
        &nbsp;&nbsp;
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label1">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label1"
              id="demo-simple-select1"
              value={category}
              label="category"
              onChange={handleChangeCat}
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
      </>
      &nbsp;
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>

        <Grid container>
          <Grid item xs={1} />
          <Grid item xs={10} container>
            {currentChallenges.map((challenge) => (
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
          challengesPerPage={challengesPerPage}
          totalPosts={toSortChallenges.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  window: PropTypes.func,
};

export default ResponsiveDrawer;
