import React, { useState, useEffect }  from 'react';
import { useSelector, useDispatch  } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from '../../store/allUsers';
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import theme from "../../theme";
import moment from "moment";

export const AdminUsers = () => {
  const users = useSelector((state) => state.allUsers);
  
  const dispatch = useDispatch();
  const [rows, setRows] = useState([]);
  const navigate = useNavigate();

  useEffect(async () => {
    await dispatch(getAllUsers());
    // const userConnections = await dispatch(getConnections(user.id));
  }, []);
  
  useEffect(() => {
    setRows(users);
  }, [users]);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      minWidth: 80,
      flex: 0.25,
    },
    {
      field: "firstName",
      headerName: "First Name",
      type: "string",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      type: "string",
      minWidth: 130,
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      minWidth: 150,
      flex: 1,
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
      field: "isAdmin",
      headerName: "Admin?",
      type: "boolean",
      minWidth: 50,
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
        <h3>View Users</h3>
        <div style={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />
        </div>
      </Box>
    </ThemeProvider>
  );
};
export default AdminUsers;
