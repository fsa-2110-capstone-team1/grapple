import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams, useLocation } from "react-router-dom";
import { Grid, Box, Button, Typography } from "@mui/material";
import ChallengeCard from "./ChallengeCard";
import SearchChallenges from "./SearchChallenges";
import PaginationFooter from "./PaginationFooter.js";
import TabPanel from "./TabPanel";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

export const _Filtered = () => {
  // const path = useLocation().pathname.split("/").pop();
  let challenges = useSelector((state) => state.challenges);
  const prop = useParams().id;
   
  if (prop === "unit") {
    challenges = challenges.filter(
      (challenge) => challenge.type === "unit"
    );
  } else if (prop === "num") {
    challenges = challenges.filter(
      (challenge) => challenge.type === "num"
    );
  } else if (prop === "diff1") {
    challenges = challenges.filter(
      (challenge) => challenge.difficulty === 1
    );
  } else if (prop === "diff2") {
    challenges = challenges.filter(
      (challenge) => challenge.difficulty === 2
    );
  } else if (prop === "diff3") {
    challenges = challenges.filter(
      (challenge) => challenge.difficulty === 3
    );
  } else if (prop === "diff4") {
    challenges = challenges.filter(
      (challenge) => challenge.difficulty === 4
    );
  } else if (prop === "diff5") {
    challenges = challenges.filter(
      (challenge) => challenge.difficulty === 5
    );
  } else if (prop === "mental") {
    challenges = challenges.filter(
      (challenge) => challenge.category === "mental"
    );
  } else if (prop === "physical") {
    challenges = challenges.filter(
      (challenge) => challenge.category === "physical"
    );
  } else if (prop === "sleep") {
    challenges = challenges.filter(
      (challenge) => challenge.category === "sleep"
    );
  } else if (prop === "food") {
    challenges = challenges.filter(
      (challenge) => challenge.category === "food"
    );
  } else if (prop === "misc") {
    challenges = challenges.filter(
      (challenge) => challenge.category === "misc"
    );
  }
  else {
    challenges = challenges;
 }

 if (!challenges) {
  return "Sorry the challenges you are looking for are unreachable";
}
console.log(challenges)


  const [currentPage, setCurrentPage] = useState(1);
  const [challengesPerPage] = useState(12);
  const [sortedChallenges, setSortedChallenges] = useState(challenges);

  useEffect(() => {
    setSortedChallenges(challenges);
  }, []);

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



  if (!challenges) {
    setSortedChallenges(challenges);
  }

  return (
    <div>
      <Grid container>
        <SearchChallenges data={challenges} />
        <div>
          <TabPanel />
          <h3>Sort by</h3>
          <div className="sorters">
            <button onClick={() => sortedUp("name")}>
              <ArrowCircleUpIcon />
            </button>
            <h3>Name</h3>

            <button onClick={() => sortedDown("name")}>
              <ArrowCircleDownIcon />
            </button>

            <button onClick={() => sortedUp("difficulty")}>
              <ArrowCircleUpIcon />
            </button>
            <h3>Difficulty</h3>
            <button onClick={() => sortedDown("difficulty")}>
              <ArrowCircleDownIcon />
            </button>

            <button onClick={() => sortedUp("category")}>
              <ArrowCircleUpIcon />
            </button>
            <h3>Category</h3>
            <button onClick={() => sortedDown("category")}>
              <ArrowCircleDownIcon />
            </button>
          </div>
        </div>

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
    </div>
  );
};
export default _Filtered;
