"use client";

import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Edit, Delete, Add, Search } from "@mui/icons-material";

import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { State, AppDispatch } from "@/src/state/store/store";
import {
  fetchUsersAction,
  createUserAction,
  updateUserAction,
  deleteUserAction,
} from "@/src/state/store/user/action";
import { CustomDialog, CustomTable } from "../_custom";
import { Button, TextField, Typography, Tooltip, Box } from "@/src/html";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: State) => {
    return {
      users: state.users,
    };
  }, shallowEqual);

  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "" });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchUsersAction());
  }, []);

  const createUser = async (userData: { name: string }) => {
    dispatch(createUserAction(userData));
  };

  const updateUser = async (id: number, userData: { name: string }) => {
    dispatch(
      updateUserAction({
        id,
        name: userData.name,
      }),
    );
  };

  const deleteUser = async (id: number) => {
    dispatch(deleteUserAction(id));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddUser = () => {
    setCurrentUser(null);
    setFormData({ name: "" });
    setFormError(null);
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setFormData({ name: user.name });
    setFormError(null);
    setOpenDialog(true);
  };

  const handleDeleteUser = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setCurrentUser(null);
    setFormError(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (currentUser) {
        await updateUser(currentUser.id, formData);
      } else {
        await createUser(formData);
      }
      handleDialogClose();
    } catch (err) {
      console.error("Form submission error:", err);
    }
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Box sx={{ p: isMobile ? 1 : 3 }}>
      {/* Header and Search Bar */}
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 3,
          gap: 2,
        }}
      >
        <Typography variant="h5" component="h1">
          User Management
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            width: isMobile ? "100%" : "auto",
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search users..."
            InputProps={{
              startAdornment: <Search color="action" sx={{ mr: 1 }} />,
            }}
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{
              width: isMobile ? "100%" : 300,
            }}
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={handleAddUser}
            sx={{
              whiteSpace: "nowrap",
              width: isMobile ? "100%" : "auto",
            }}
          >
            Add User
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Users Table */}
      {/* <TableContainer
        component={Paper}
        sx={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}
      >
        <Table
          stickyHeader
          aria-label="users table"
          size={isMobile ? "small" : "medium"}
        >
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              {!isMobile && (
                <>
                  <TableCell>Created</TableCell>
                  <TableCell>Updated</TableCell>
                </>
              )}
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.userData.loading ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  align="center"
                  sx={{ py: 5 }}
                >
                  <CircularProgress />
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Loading users...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : users.userData.userList.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={isMobile ? 3 : 5}
                  align="center"
                  sx={{ py: 5 }}
                >
                  <Typography variant="body2" color="textSecondary">
                    {searchTerm
                      ? "No matching users found"
                      : "No users available"}
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              users.userData.userList.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  {!isMobile && (
                    <>
                      <TableCell>{formatDate(user.created_at)}</TableCell>
                      <TableCell>{formatDate(user.updated_at)}</TableCell>
                    </>
                  )}
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => handleEditUser(user)}
                        size={isMobile ? "small" : "medium"}
                      >
                        <Edit color="primary" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDeleteUser(user.id)}
                        size={isMobile ? "small" : "medium"}
                      >
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer> */}
      <CustomTable tableHeader={["id", "name"]} tableData={[]} tableInfo="" />

      {/* Add/Edit User Dialog */}
      <CustomDialog
        open={openDialog}
        onClose={handleDialogClose}
        title={currentUser ? "Edit User" : "Add New User"}
        actions={[
          <Button onClick={handleDialogClose}>Cancel</Button>,
          <Button onClick={handleFormSubmit}>Save</Button>,
        ]}
        content={
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="User Name"
            type="text"
            fullWidth
            variant="outlined"
            value={formData.name}
            onChange={handleFormChange}
            required
            disabled={formLoading}
            sx={{ mt: 1 }}
          />
        }
      />
    </Box>
  );
};

export default Home;
