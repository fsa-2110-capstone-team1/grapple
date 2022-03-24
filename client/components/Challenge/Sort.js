import React, { useEffect, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";

function Sort({ challenges }) {
  const sort = (attribute, direction) => {
    console.log("sort goes here for: ", attribute, direction);
  };

  return (
    <List>
      {["Name", "Difficulty", "Category"].map((attribute, index) => (
        <ListItem key={index}>
          <ListItemText primary={attribute} />
          <ArrowCircleUpIcon onClick={() => sort(attribute, direction)} />
          <ArrowCircleDownIcon
            onClick={() => sortedDown(attribute, direction)}
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Sort;
