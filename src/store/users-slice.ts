import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UsersObject {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
}

interface UsersState {
  usersData: UsersObject[];
  loading: boolean;
  error: string | null;
  deleting: boolean;
  editing: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: UsersState = {
  usersData: [],
  loading: false,
  error: null,
  deleting: false,
  editing: false,
  successMessage: "",
  errorMessage: "",
};

export const fetchUsers = createAsyncThunk<
  UsersObject[],
  {
    id?: number;
    updatedUser?: UsersObject;
    actionType: "GET" | "PUT" | "DELETE";
  },
  { rejectValue: string }
>("users/fetchUsers", async ({ id, updatedUser, actionType }) => {
  const apiUrl = "http://localhost:8000/users";
  try {
    let resp;
    switch (actionType) {
      case "GET":
        if (id) {
          resp = await axios.get<UsersObject>(`${apiUrl}/${id}`);
          return [resp.data];
        } else {
          resp = await axios.get<UsersObject[]>(apiUrl);
          return resp.data;
        }
      case "PUT":
        if (id && updatedUser) {
          resp = await axios.put<UsersObject>(`${apiUrl}/${id}`, updatedUser);
          return [resp.data];
        } else {
          throw new Error("Invalid PUT request arguments");
        }
      case "DELETE":
        if (id) {
          resp = await axios.delete<UsersObject>(`${apiUrl}/${id}`);
          return [resp.data];
        } else {
          throw new Error("Invalid DELETE request arguments");
        }
      default:
        throw new Error("Invalid actionType");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred.");
    }
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    isDeleting: (state, action) => {
      state.deleting = action.payload;
    },
    removeUser: (state, action: PayloadAction<number>) => {
      state.usersData = state.usersData.filter(
        (user) => user.id !== action.payload
      );
    },
    isEditing: (state, action) => {
      state.editing = action.payload;
    },
    editUser: (state, action: PayloadAction<UsersObject>) => {
      const updatedUser = action.payload;
      const updatedUsersData = state.usersData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      );
      state.usersData = updatedUsersData;
    },
    setSuccessMessage: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
    },

    setErrorMessage: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;

        if (action.meta.arg.actionType === "GET") {
          state.usersData = action.payload;
        }

        if (action.meta.arg.actionType === "DELETE") {
          const [deletedUser] = action.payload;
          state.usersData = state.usersData.filter(
            (user) => user.id !== deletedUser.id
          );
          state.successMessage = "User deleted successfully";
        }

        if (action.meta.arg.actionType === "PUT") {
          const [updatedUser] = action.payload;
          state.usersData = state.usersData.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          state.successMessage = "User updated successfully";
        }
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";

        if (action.meta.arg.actionType === "PUT") {
          state.errorMessage = "Failed to update user.";
        }

        if (action.meta.arg.actionType === "DELETE") {
          state.errorMessage = "Failed to delete user.";
        }
      });
  },
});

export const { editUser, removeUser, isDeleting, isEditing } =
  usersSlice.actions;

export default usersSlice.reducer;
