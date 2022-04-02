import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import AdminUsers from "./AdminUsers";
import AdminChallenges from "./AdminChallenges";
import CreateChallenge from "../Challenge/CreateChallenge";
import Sidebar from "./Sidebar";
import theme from "../../theme";

function AdminHubComponent() {
  const [selected, setSelected] = useState('Challenges');

  // useEffect(() => {
    
  //   setSelected("Challenge");
  // }, []);
  return (
    <Box
      sx={{
        minHeight: "100vh",
        // backgroundColor: theme.palette.braun.main,
      }}
    >
      <Grid container>
        {/* Sidebar */}
        <Grid item xs={2}>
          <Sidebar func={setSelected}/>
        </Grid>
        {/* grid tables (right side) */}
        <Grid item xs={10} sx={{ mt: "25px" , padding: "20px"}}>
          {selected === "Challenges" && <AdminChallenges/>}
          {selected === "Users" && <AdminUsers />}
          {selected === "Add New Challenge" && <CreateChallenge method={'create'}/>}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHubComponent;
