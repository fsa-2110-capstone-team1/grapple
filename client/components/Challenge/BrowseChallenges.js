import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Grid, Box, Button, Typography } from "@mui/material";
import ChallengeCard from "./ChallengeCard";
import SearchChallenges from "./SearchChallenges";
import PaginationFooter from "./PaginationFooter.js";

export const BrowseChallenges = () => {
  const challenges = useSelector((state) => state.challenges);

const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(10);

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexofFirstChallenge = indexOfLastChallenge - challengesPerPage;
  const currentChallenges = challenges.slice(indexofFirstChallenge, indexOfLastChallenge)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const [order, setOrder] = useState("ASC")
  // const sorting = (attr) => {
  //   if (order === "ASC"){
  //     const sorted = [...challenges].sort((a,b)=>
  //     a[attr].toLowerCase() > b[attr].toLowerCase() ? 1 : -1
  //     )
  //   }
  // };

  return (
    <div>
    <Grid container>
      <SearchChallenges data={challenges}/>
      <div>
        <h1>Sort by</h1>
      <div className="sorters">
      <p onClick={()=>sorting("name")}>Name &nbsp; </p> 
      <p onClick={()=>sorting("difficulty")}>Difficulty &nbsp;</p>
      <p onClick={()=>sorting("type")}>Type &nbsp;</p>

      </div>
      </div>
      <Grid item xs={1} />
      <Grid item xs={10} container>
        {currentChallenges.map((challenge) => (
          <Grid item key={challenge.id} xs={12} sm={6} md={4} lg={3} container>
            <ChallengeCard key={challenge.id} challenge={challenge} />
          </Grid>
        ))}
      </Grid>
      <Grid item xs={1} />
    </Grid>
    <PaginationFooter challengesPerPage={challengesPerPage} totalPosts={challenges.length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
};
export default BrowseChallenges;
