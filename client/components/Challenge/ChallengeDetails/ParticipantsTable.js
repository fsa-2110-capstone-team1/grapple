import React, { useState, useEffect } from "react";
import { Grid, Box, Typography, Divider, Button } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/material/styles";
import dateFormat from "dateformat";
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
import IconButton from "@mui/material/IconButton";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";
import ProgressBar from "../../User/UserDashboard/ProgressBar";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#FEBF30",
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

export const ParticipantsTable = ({ enrolledUsers }) => {
  const { id } = useParams();
  const { userChallenges, challenges, publicUsers } = useSelector(
    (state) => state
  );
  const navigate = useNavigate();

  const [userIdWithProgress, setUserIdWithProgress] = useState([]);
  useEffect(() => {
    const userProgress = {};
    if (!!enrolledUsers.length && !!userChallenges.length) {
      const usersLeaderboard = enrolledUsers.map((user) => {
        const userChallenge = userChallenges.filter(
          (userChallenge) =>
            userChallenge.userId === user.id &&
            userChallenge.challengeId === id * 1
        );
        userProgress[user.id] = userChallenge[0]?.percentCompleted;
        return userProgress;
      });

      Object.keys(userProgress).forEach((key) => {
        let obj = { userId: 0, progress: 0 };
        obj.userId = key;
        obj.progress = userProgress[key];
        userIdWithProgress.push(obj);
      });
    }
  }, [userChallenges, enrolledUsers]);

  userIdWithProgress.sort(
    (a, b) => parseFloat(b.progress) - parseFloat(a.progress)
  );
  userIdWithProgress.sort(
    (a, b) => parseFloat(b.progress) - parseFloat(a.progress)
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0
      ? Math.max(0, (1 + page) * rowsPerPage - userIdWithProgress.length)
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
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="center">Avatar</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Username</StyledTableCell>
            <StyledTableCell align="center">Progress</StyledTableCell>
          </TableRow>
        </TableHead>

        {(rowsPerPage > 0
          ? userIdWithProgress.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : userIdWithProgress
        ).map((obj, idx) => {
          const user = publicUsers.find((user) => user.id === obj.userId * 1);
          return (
            <TableBody key={idx}>
              <TableRow
                hover
                role="checkbox"
                onClick={() => navigate(`/users/profile/${user?.username}`)}
              >
                <StyledTableCell component="th" scope="challenge">
                  {idx + 1}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Box
                    component="img"
                    src={user?.image}
                    sx={{
                      width: "30px",
                      height: "30px",
                      borderRadius: 50,
                      objectFit: "cover",
                    }}
                  />
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user?.firstName} {user?.lastName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user?.username}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <ProgressBar
                    props={{
                      bgColor: bgData[idx % 4],
                      completed: Math.floor(obj.progress * 100),
                    }}
                  />
                </StyledTableCell>
              </TableRow>
            </TableBody>
          );
        })}
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={userIdWithProgress.length}
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
export default ParticipantsTable;
