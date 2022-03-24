import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

const Sort = ({
  setActivePage,
  sort,
  setSort,
  filteredChallenges,
  setFilteredChallenges,
}) => {
  useEffect(() => {
    setFilteredChallenges(sortChallenges(filteredChallenges, sort));
  }, [sort]);

  const sortChallenges = (filteredChallenges, sort) => {
    return filteredChallenges.sort((a, b) => {
      const { order, orderBy } = sort;

      if (!a[orderBy]) return 1;
      if (!b[orderBy]) return -1;

      if (order === "asc") {
        if (Number(a[orderBy])) {
          return a[orderBy] - b[orderBy];
        } else {
          if (a[orderBy] > b[orderBy]) {
            return 1;
          } else if (a[orderBy] < b[orderBy]) {
            return -1;
          } else {
            return 0;
          }
        }
      } else {
        if (Number(a[orderBy])) {
          return b[orderBy] - a[orderBy];
        } else {
          if (a[orderBy] < b[orderBy]) {
            return 1;
          } else if (a[orderBy] > b[orderBy]) {
            return -1;
          } else {
            return 0;
          }
        }
      }
    });
  };

  const handleSort = (order, attribute) => {
    setActivePage(1);
    setSort(() => ({
      order,
      orderBy: attribute,
    }));
  };

  return (
    <List>
      {["Name", "Difficulty", "Category"].map((attribute, index) => (
        <ListItem key={index}>
          <ListItemText primary={attribute} />
          <ArrowCircleUpIcon
            color={
              sort["orderBy"] === attribute.toLowerCase() &&
              sort["order"] === "asc"
                ? "primary"
                : ""
            }
            sx={{ cursor: "pointer" }}
            onClick={() => handleSort("asc", attribute.toLowerCase())}
          />
          <ArrowCircleDownIcon
            color={
              sort["orderBy"] === attribute.toLowerCase() &&
              sort["order"] === "desc"
                ? "primary"
                : ""
            }
            sx={{ cursor: "pointer" }}
            onClick={() => handleSort("desc", attribute.toLowerCase())}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default Sort;
