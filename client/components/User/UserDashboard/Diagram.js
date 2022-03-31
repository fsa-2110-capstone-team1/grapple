import React from "react";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  useTheme,
} from "@mui/material";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

export const Diagram = ({ myChallenges }) => {
  const theme = useTheme();

  const completedChellenges = myChallenges.filter(
    (ch) => ch.status === "Completed"
  );

  const failedChallenges = myChallenges.filter(
    (ch) => ch.status !== "Completed" && new Date() > new Date(ch.endDateTime)
  );

  const ongoingChallenges = myChallenges.filter(
    (ch) =>
      (ch.status === "In Progress" || ch.status === "Not Started") &&
      new Date() <= new Date(ch.endDateTime)
  );

  const completed = Math.floor(
    (completedChellenges.length / myChallenges.length) * 100
  );
  const failed = Math.floor(
    (failedChallenges.length / myChallenges.length) * 100
  );
  const ongoing = Math.floor(
    (ongoingChallenges.length / myChallenges.length) * 100
  );

  const data = {
    datasets: [
      {
        data: [failed, completed, ongoing],
        backgroundColor: ["#C54B7B", "#4AB5A3", "#FEBF30"],
        borderWidth: 8,
        borderColor: "#FFFFFF",
        hoverBorderColor: "#FFFFFF",
      },
    ],
    labels: ["Failed", "Completed", "In Progress"],
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: "index",
      titleFontColor: theme.palette.text.primary,
    },
  };

  const progress = [
    {
      title: "Failed",
      value: failed,
      icon: HighlightOffOutlinedIcon,
      color: "#C54B7B",
    },
    {
      title: "Completed",
      value: completed,
      icon: CheckCircleOutlineOutlinedIcon,
      color: "#4AB5A3",
    },
    {
      title: "In Progress",
      value: ongoing,
      icon: AutorenewOutlinedIcon,
      color: "#FEBF30",
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Your Progress Diagram"
        sx={{
          color: "white",
          backgroundColor: "#F57D52",
          paddingTop: "8px",
          paddingBottom: "8px",
        }}
        titleTypographyProps={{
          fontSize: "0.875rem",

          fontWeight: "500",
        }}
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: "relative",
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            pt: 2,
          }}
        >
          {progress.map(({ color, icon: Icon, title, value }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: "center",
              }}
            >
              <Icon color="action" />
              <Typography color="textPrimary" variant="body1">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h4">
                {value ? value : 0}%
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
