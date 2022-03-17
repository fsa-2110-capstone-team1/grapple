import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@mui/material";
import ChallengeCard from "../ChallengeCard";
import SearchChallenges from "../SearchChallenges";
import PaginationFooter from "../PaginationFooter.js";
import { Link } from 'react-router-dom';

export const Num = () => {
  // const path = useLocation().pathname.split("/").pop();
  const challenges = useSelector((state) => state.challenges);

const filteredChallenges = challenges.filter(challenge => challenge.type === 'num')
console.log(filteredChallenges)
  
const [currentPage, setCurrentPage] = useState(1);
const [challengesPerPage] = useState(12);


//sortedChallenges is suppose to become sorted from the sorted function, currently sortedChallenges isnt populating
// down on line 32, that function works correctly,
const [sortedChallenges, setSortedChallenges] = useState(challenges);

  const indexOfLastChallenge = currentPage * challengesPerPage;
  const indexofFirstChallenge = indexOfLastChallenge - challengesPerPage;


  //  I want to change challenges.slice to sortedChallenges.slice
  const currentChallenges = filteredChallenges.slice(indexofFirstChallenge, indexOfLastChallenge)

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [order, setOrder] = useState("ASC")

  const sorted = (attr) => {
    if (order === "ASC"){
      const sorted = [...challenges].sort((a,b)=>{
      if (a[attr] > b[attr]){
        return 1;
      }
      if (a[attr]< b[attr]){
        return -1;
      }
      return 0;
    })

  }
  setSortedChallenges(sorted);
}


if (!filteredChallenges) {
  return "Sorry the challenges you are looking for are unreachable";
}


  return (
    <div>
    <Grid container>
      <SearchChallenges data={challenges}/>
      <div>
        <h2>Number denominated</h2>
        <h3>Sort by</h3>
      <div className="sorters">
      <p onClick={()=>sorted("name")}>Name &nbsp; </p> 
      <p onClick={()=>sorted("difficulty")}>Difficulty &nbsp;</p>
      <p onClick={()=>sorted("type")}>Type &nbsp;</p>
      </div>
      <h3>Filter by</h3>
      <div className="sorters">
    <ul>
      <h4>Units</h4>
    <Link to={`/challenges/num` }> Num</Link >
    <Link to={`/challenges/unit` }> Unit</Link >
    <h4>Difficulties</h4>
    <Link to={`/challenges/diff1` }> 1</Link >
    <Link to={`/challenges/diff2` }> 2</Link >
    <Link to={`/challenges/diff3` }> 3</Link >
    <Link to={`/challenges/diff4` }> 4</Link >
    <Link to={`/challenges/diff5` }> 5</Link >
    </ul>
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
    <PaginationFooter challengesPerPage={challengesPerPage} totalPosts={filteredChallenges.length} paginate={paginate} currentPage={currentPage} />
    </div>
  );
};
export default Num;
