"use client";

import { useState, useEffect } from "react";
import { useMediaQuery, useTheme } from "@mui/material";
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
import {
  Button,
  TextField,
  Typography,
  Tooltip,
  Box,
  IconButton,
} from "@/src/html";

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const dispatch = useDispatch<AppDispatch>();
  const { users } = useSelector((state: State) => {
    return {
      users: state.users,
    };
  }, shallowEqual);

  const [searchTerm, setSearchTerm] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: "" });

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
    setOpenDialog(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser(user);
    setFormData({ name: user.name });
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
      {/* Users Table */}
      <CustomTable
        tableHeader={[
          { label: "ID", key: "id" },
          { label: "Name", key: "name" },
          { label: "Created", key: "created_at" },
          { label: "Updated", key: "updated_at" },
          "Actions",
        ]}
        tableData={users.userData.userList.map((item) => ({
          ...item,
          created_at: formatDate(item.created_at),
          updated_at: formatDate(item.updated_at),
          actions: [
            <Tooltip title="Edit" placement="bottom" arrow>
              <IconButton onClick={() => handleEditUser(item)}>
                <Edit color="primary" />
              </IconButton>
            </Tooltip>,
            <Tooltip title="Delete" placement="bottom" arrow>
              <IconButton onClick={() => handleDeleteUser(item.id)}>
                <Delete color="error" />
              </IconButton>
            </Tooltip>,
          ],
        }))}
        tableInfo={
          users.userData.loading ? "Loading users..." : "No data available"
        }
        loading={users.userData.loading}
      />

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
            sx={{ mt: 1 }}
          />
        }
      />
    </Box>
  );
};

export default Home;
