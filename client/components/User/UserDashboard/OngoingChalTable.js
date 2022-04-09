import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import dateFormat from "dateformat";
import { useTheme } from "@mui/material/styles";
import { Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import PropTypes from "prop-types";
import ProgressBar from "./ProgressBar";
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#C54B7B",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    padding: "0px 16px",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
  [`&.${tableRowClasses.root}`]: {
    height: "10px",
    padding: "5px",
  },
}));
const bgData = [
  { bgcolor: "#FEBF30", idx: 0 },
  { bgcolor: "#F57D52", idx: 1 },
  { bgcolor: "#4AB5A3", idx: 2 },
  { bgcolor: "#C54B7B", idx: 3 },
];

function TablePaginationActions(props) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (event) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };
  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

export const OngoingChalTable = ({ myChallenges }) => {
  const { challenges, publicUsers, userChallenges, auth } = useSelector(
    (state) => state
  );

  const navigate = useNavigate();

  const ongoingChallenges = myChallenges
    .filter(
      (ch) =>
        (ch.status === "In Progress" || ch.status === "Not Started") &&
        new Date() <= new Date(ch.endDateTime)
    )
    .sort((a, b) => new Date(a.endDateTime) - new Date(b.endDateTime));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - ongoingChallenges.length)
      : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="a dense table" size="small">
        <TableHead>
          <TableRow>
            <StyledTableCell> Ongoing Challenge</StyledTableCell>
            <StyledTableCell align="center">Ends on</StyledTableCell>
            <StyledTableCell align="center">Participants</StyledTableCell>
            <StyledTableCell align="center">Progress</StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
          </TableRow>
        </TableHead>

        {(rowsPerPage > 0
          ? ongoingChallenges.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : ongoingChallenges
        ).map((challenge, idx) => {
          const ongoingUserChallenge = userChallenges.filter(
            (userChallenge) =>
              userChallenge.challengeId === challenge.id &&
              userChallenge.userId === auth.id
          );
          const enrolledUsers = userChallenges
            .filter(
              (userChallenge) => userChallenge.challengeId === challenge.id
            )
            ?.map((chall) =>
              publicUsers.find((publicUser) => publicUser.id === chall.userId)
            );
          const progress = ongoingUserChallenge[0]?.percentCompleted * 1;
          const progressInPercentage = (progress * 100).toFixed(1);

          return (
            <TableBody key={challenge.name}>
              <StyledTableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="challenge">
                  {challenge.name}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {dateFormat(challenge.endDateTime, "paddedShortDate")}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {enrolledUsers.length === 1
                    ? "Just You"
                    : enrolledUsers.length - 1 === 1
                    ? "1 friend"
                    : `${enrolledUsers.length - 1} friends`}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ProgressBar
                    props={{
                      bgColor: bgData[idx % 4],
                      completed: progressInPercentage * 1,
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    onClick={() =>
                      navigate(`/challenges/details/${challenge.id}`)
                    }
                  >
                    Go!
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          );
        })}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={ongoingChallenges.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "rows per page",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};
