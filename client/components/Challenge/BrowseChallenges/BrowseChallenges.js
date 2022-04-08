import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { Grid, Box } from "@mui/material";
import PaginationFooter from "./PaginationFooter";
import ChallengeCard from "../ChallengeCard";
import FilterDrawer from "./FilterDrawer";
import theme from "../../../theme";

function BrowseChallenges() {
  const stateChallenges = useSelector((state) => state.challenges);

  const [challenges, setChallenges] = useState([]);
  useEffect(() => {
    setChallenges(
      stateChallenges.map((c) => ({
        ...c,
        status:
          new Date() < new Date(c.startDateTime)
            ? "Not Started"
            : new Date() >= new Date(c.startDateTime) &&
              new Date() < new Date(c.endDateTime)
            ? "In Progress"
            : "Ended",
      }))
    );
  }, [stateChallenges]);

  //filtering
  const [filters, setFilters] = useState({});
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  // URL params
  let { filterAndSortParams } = useParams();
  let [filterParams, sortParams] = filterAndSortParams
    ?.split("?")
    ?.map((el) => el.split("=")[1]) || [undefined, undefined];
  // console.log("FILTER URL PARAMS: ", filterParams);
  // console.log("SORT URL PARAMS: ", sortParams);

  useEffect(() => {
    if (filterParams) {
      const filterParamsParsed = filterParams.split("&").reduce((acc, f) => {
        const [attr, value] = f.split(":");
        acc[attr] = Number(value) ? Number(value) : value;
        return acc;
      }, {});
      setFilters(filterParamsParsed);
    } else {
      setFilteredChallenges(challenges.filter((c) => c.status !== "Ended"));
      setFilters({});
    }
  }, [filterParams]);

  console.log("FILTER: ", filters);

  const navigate = useNavigate();

  useEffect(() => {
    const filterString = Object.entries(filters)
      .map((kv) => `${kv[0]}:${kv[1]}`)
      .join("&");
    if (filterString.length > 0) {
      navigate(`/challenges/filters=${filterString}`);
    }
  }, [JSON.stringify(filters)]);

  //sorting
  const [sort, setSort] = useState({ order: "asc", orderBy: "id" });

  //pagination calculations
  const [activePage, setActivePage] = useState(1);
  const challengesPerPage = 12;
  const count = filteredChallenges.length;
  const totalPages = Math.ceil(count / challengesPerPage);

  const [calculatedChallenges, setCalculatedChallenges] = useState([]);
  useEffect(() => {
    setCalculatedChallenges(
      filteredChallenges.slice(
        (activePage - 1) * challengesPerPage,
        activePage * challengesPerPage
      )
    );
  }, [
    JSON.stringify(sort),
    JSON.stringify(filters),
    filteredChallenges,
    activePage,
  ]);

  //scroll to top at page load or paginate
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, activePage, filters, sort]);

  console.log("CALC CHALLENGES: ", filteredChallenges);

  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
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
        <Grid item xs={10} sx={{ mt: "25px" }}>
          <Box sx={{ minHeight: "70vh" }}>
            <Grid container>
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
          </Box>
          <PaginationFooter
            activePage={activePage}
            totalPages={totalPages}
            setActivePage={setActivePage}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default BrowseChallenges;
