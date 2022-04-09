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

  // URL params
  const { filterAndSortParams } = useParams();
  // console.log("SORT FILTER URL PARAMS: ", filterAndSortParams);
  const [filterParams, setFilterParams] = useState("");
  const [sortParams, setSortParams] = useState("");
  useEffect(() => {
    if (!!filterAndSortParams?.length) {
      if (filterAndSortParams.startsWith("sort")) {
        setSortParams(filterAndSortParams.split("=")[1]);
      } else {
        const paramsSplit = filterAndSortParams
          .split("_")
          .map((el) => el.split("=")[1]);
        if (paramsSplit.length === 1) {
          setFilterParams(paramsSplit[0]);
        } else {
          setFilterParams(paramsSplit[0]);
          setSortParams(paramsSplit[1]);
        }
      }
    }
  }, [filterAndSortParams]);

  // console.log("FILTER URL PARAMS: ", filterParams);
  // console.log("SORT URL PARAMS: ", sortParams);

  //filtering
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState({});
  const [filteredChallenges, setFilteredChallenges] = useState([]);

  useEffect(() => {
    if (!!filterAndSortParams?.length) {
      if (!!filterParams?.length) {
        const filterParamsParsed = filterParams.split("&").reduce((acc, f) => {
          const [attr, value] = f.split(":");
          acc[attr] = Number(value) ? Number(value) : value;
          return acc;
        }, {});
        setFilters(filterParamsParsed);
        if (!!sortParams?.length) {
          const sortParamsParsed = sortParams?.split("&").reduce((acc, s) => {
            const [attr, value] = s.split(":");
            acc[attr] = Number(value) ? Number(value) : value;
            return acc;
          }, {});
          //Needs the timeout because without it filter ordering overrides sort order
          //Hacky solution but didnt have time to find a better one
          setTimeout(() => {
            setSort(sortParamsParsed);
          }, 400);
        }
      } else if (!!sortParams?.length) {
        const sortParamsParsed = sortParams?.split("&").reduce((acc, s) => {
          const [attr, value] = s.split(":");
          acc[attr] = Number(value) ? Number(value) : value;
          return acc;
        }, {});
        setSort(sortParamsParsed);
      }
    } else {
      setFilteredChallenges(challenges.filter((c) => c.status !== "Ended"));
      setFilters({});
      setSort({});
    }
  }, [filterParams, sortParams]);

  console.log("FILTER: ", filters);
  // console.log("SORT: ", sort);

  useEffect(() => {
    const filterString = Object.entries(filters)
      .map((kv) => `${kv[0]}:${kv[1]}`)
      .join("&");
    const sortString = Object.entries(sort)
      .map((kv) => `${kv[0]}:${kv[1]}`)
      .join("&");
    if (filterString.length > 0 && sortString.length > 0) {
      navigate(`/challenges/filters=${filterString}_sort=${sortString}`);
    } else if (filterString.length > 0) {
      navigate(`/challenges/filters=${filterString}`);
    } else if (sortString.length > 0) {
      navigate(`/challenges/sort=${sortString}`);
    }
  }, [JSON.stringify(filters), JSON.stringify(sort)]);

  //pagination calculations
  const [activePage, setActivePage] = useState(1);
  const challengesPerPage = 12;
  const count = filteredChallenges.length;
  const totalPages = Math.ceil(count / challengesPerPage);

  const [calculatedChallenges, setCalculatedChallenges] = useState([]);
  useEffect(() => {
    console.log("FILTERED CHAL: ", filteredChallenges);

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

  const navigate = useNavigate();

  //scroll to top at page load or paginate
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, activePage, filters, sort]);

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
