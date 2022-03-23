import React from "react";

const ProgressBar = (props) => {
  const completed = props.props.completed;
  const bgcolor = props.props.bgColor.bgcolor;

  const containerStyles = {
    height: "20px",
    width: "100%",
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    // margin: 50
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "right",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
