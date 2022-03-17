import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@mui/material";
import ChallengeCard from "./ChallengeCard";
import SearchChallenges from "./SearchChallenges";
import PaginationFooter from "./PaginationFooter.js";
import { Link } from "react-router-dom";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export const BrowseChallenges = () => {
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
  const currentChallenges = challenges.slice(
    indexofFirstChallenge,
    indexOfLastChallenge
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // const [order, setOrder] = useState("ASC")

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

  return (
    <div>
      <Grid container>
        <SearchChallenges data={challenges} />
        <div>
          <h3>Sort by</h3>
          <div className="sorters">
            <button onClick={() => sortedDown("name")}>
              <ArrowCircleDownIcon />
            </button>
            <h3>Name</h3>
            <button onClick={() => sortedUp("name")}>
              <ArrowCircleUpIcon />
            </button>

            <button onClick={() => sortedDown("difficulty")}>
              <ArrowCircleDownIcon />
            </button>
            <h3>Difficulty</h3>
            <button onClick={() => sortedUp("difficulty")}>
              <ArrowCircleUpIcon />
            </button>

            <button onClick={() => sortedDown("category")}>
              <ArrowCircleDownIcon />
            </button>
            <h3>Category</h3>
            <button onClick={() => sortedUp("category")}>
              <ArrowCircleUpIcon />
            </button>
          </div>
          <h3>Filter</h3>
          <div className="sorters">
            <ul>
              <Link to={`/challenges/id`} id={num}> Num</Link>
              <Link to={`/challenges/unit`}> Unit</Link>
              <Link to={`/challenges/diff1`}> Diff 1</Link>
              <Link to={`/challenges/diff2`}> Diff 2</Link>
              <Link to={`/challenges/diff3`}> Diff 3</Link>
              <Link to={`/challenges/diff4`}> Diff 4</Link>
              <Link to={`/challenges/diff5`}> Diff 5</Link>
              <Link to={`/challenges/cat1`}> Cat 1</Link>
              <Link to={`/challenges/cat2`}> Cat 2</Link>
              <Link to={`/challenges/cat3`}> Cat 3</Link>
              <Link to={`/challenges/cat4`}> Cat 4</Link>
              <Link to={`/challenges/cat5`}> Cat 5</Link>
            </ul>
          </div>
        </div>
        <Grid item xs={1} />
        <Grid item xs={10} container>
          {sortedChallenges.map((challenge) => (
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
    </div>
  );
};
export default BrowseChallenges;
