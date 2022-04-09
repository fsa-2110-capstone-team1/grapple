import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { DataGrid } from "@mui/x-data-grid";
import { updateChallenge } from "../../store";
import theme from "../../theme";
import moment from "moment";

export const AdminChallenges = () => {
  const challenges = useSelector((state) => state.challenges);
  const categories = [
    ...new Set(challenges.map((challenge) => challenge.category)),
  ];

  const [rows, setRows] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setRows(challenges);
  }, [challenges]);

  const [snackbar, setSnackbar] = useState(null);
  const handleCloseSnackbar = () => setSnackbar(null);

  const handleCellEditCommit = async (params) => {
    try {
      const currentRow = rows.find((row) => row.id === params.id);
      if (currentRow[params.field] !== params.value) {
        // Dispatch challenge update
        const response = await dispatch(
          updateChallenge({
            id: params.id,
            [params.field]: params.value,
          })
        );

        setSnackbar({
          children: "Challenge successfully saved",
          severity: "success",
        });
        setRows((prev) =>
          prev.map((row) =>
            row.id === params.id ? { ...row, ...response } : row
          )
        );
      }
    } catch (error) {
      console.log(error);
      setSnackbar({
        children: "Error while saving challenge",
        severity: "error",
      });
      // Restore the row in case of error
      setRows((prev) => [...prev]);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      minWidth: 80,
      flex: 0.25,
      editable: false,
      renderCell: (params) => {
        return (
          <Link
            style={{ color: "white" }}
            to={`/challenges/details/${params.value}`}
          >
            {params.value}
          </Link>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      type: "string",
      minWidth: 100,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "category",
      headerName: "Category",
      type: "singleSelect",
      valueOptions: categories,
      minWidth: 100,
      flex: 0.75,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      type: "number",
      minWidth: 80,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "targetNumber",
      headerName: "Target Num",
      type: "number",
      minWidth: 80,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "targetUnit",
      headerName: "Target Unit",
      type: "string",
      minWidth: 80,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "image",
      headerName: "Image",
      type: "string",
      minWidth: 80,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "startDateTime",
      headerName: "Start Date",
      type: "date",
      minWidth: 120,
      flex: 0.5,
      editable: true,
      renderCell: (params) => {
        return moment(params.value).format("L");
      },
    },
    {
      field: "endDateTime",
      headerName: "End Date",
      type: "date",
      minWidth: 120,
      flex: 0.5,
      editable: true,
      renderCell: (params) => {
        return moment(params.value).format("L");
      },
    },
    {
      field: "goalType",
      headerName: "Goal Type",
      type: "string",
      minWidth: 80,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "description",
      headerName: "Description",
      type: "string",
      minWidth: 150,
      flex: 1,
      editable: true,
      preProcessEditCellProps: (params) => {
        const isValid = !!params.props.value;
        return { ...params.props, error: !isValid };
      },
    },
    {
      field: "createdAt",
      headerName: "Registration Date",
      type: "date",
      minWidth: 120,
      flex: 0.5,
      renderCell: (params) => {
        return moment(params.value).format("L");
      },
    },
    {
      field: "isPrivate",
      headerName: "Private",
      type: "boolean",
      minWidth: 80,
      flex: 0.25,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          my: 4,
          mx: 4,
        }}
        component="div"
      >
        <h3>View Challenges</h3>
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            experimentalFeatures={{ preventCommitWhileValidating: true }}
            onCellEditCommit={handleCellEditCommit}
          />
          {!!snackbar && (
            <Snackbar
              open
              onClose={handleCloseSnackbar}
              autoHideDuration={6000}
            >
              <Alert {...snackbar} onClose={handleCloseSnackbar} />
            </Snackbar>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
};
export default AdminChallenges;
