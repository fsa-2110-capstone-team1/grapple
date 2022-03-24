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

function FilterDrawer({ challenges }) {
  const drawerWidth = 300;

  const drawer = (
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
          <List>
            {["name", "difficulty", "category"].map((text, index) => (
              <div className="sorting" key={index}>
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
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          <Typography variant="h6">Filter By</Typography>
          <Box sx={{ mt: 3 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Difficulty</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={difficulty}
                value={0}
                label="difficulty"
                // onChange={handleChangeDiff}
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
              <InputLabel id="demo-simple-select-label1">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label1"
                id="demo-simple-select1"
                // value={category}
                value={0}
                label="category"
                // onChange={handleChangeCat}
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
        </Grid>
      </Grid>
    </>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
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
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default FilterDrawer;
