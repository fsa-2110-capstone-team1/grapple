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
import Filterer from "./Drawer/Filterer";
import Searcher from "./Drawer/Searcher";
import { useSelector } from "react-redux";
import { Grid, Box, Button, Typography } from "@mui/material";
import PaginationFooter from "./PaginationFooter.js";
import ChallengeCard from "./ChallengeCard";

// const { publicUsers } = useSelector((state) => state);

const drawerWidth = 200;

function ResponsiveDrawer(props) {
  // const path = useLocation().pathname.split("/").pop();
  const challenges = useSelector((state) => state.challenges);

  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(12);
  const [sortedChallenges, setSortedChallenges] = useState(challenges);
  useEffect(() => {
    setSortedChallenges(challenges);
  }, [challenges]);
  //sortedChallenges is suppose to become sorted from the sorted function, currently sortedChallenges isnt populating
  // down on line 32, that function works correctly,

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexofFirstChallenge = indexOfLastChallenge - challengesPerPage;

  //  I want to change challenges.slice to sortedChallenges.slice
  const currentChallenges = sortedChallenges.slice(
    indexofFirstChallenge,
    indexOfLastChallenge
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [order, setOrder] = useState("ASC");

  const sortedUp = (attr) => {
    let sortedArry;
    // if (order === "ASC")
    {
      sortedArry = [...challenges].sort((a, b) => {
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
      sortedArry = [...challenges].sort((a, b) => {
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

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <h3>Search</h3>
      <Searcher data={challenges} />
      <Divider />
      <h3>Sort By</h3>
      <List>
        {["Name", "Difficulty", "Category"].map((text, index) => (
          <div className="sorting">
            <ListItem>
              <div className="arrow">
                <ArrowCircleUpIcon onClick={() => console.log({ text })} />
              </div>
              <div className="arrow">
                <ArrowCircleDownIcon onClick={() => console.log({ text })} />
              </div>
              <ListItemText primary={text} />
            </ListItem>
          </div>
        ))}
      </List>
      <Divider />
      <Filterer />
      &nbsp;
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      ></AppBar> */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
          totalPosts={challenges.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
