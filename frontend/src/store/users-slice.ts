import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UsersObject {
  _id?: string;
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
  adding: boolean;
  successMessage: string | null;
  errorMessage: string | null;
}

const initialState: UsersState = {
  usersData: [],
  loading: false,
  error: null,
  deleting: false,
  editing: false,
  adding: false,
  successMessage: "",
  errorMessage: "",
};

export const fetchUsers = createAsyncThunk<
  UsersObject[],
  {
    id?: string;
    updatedUser?: UsersObject;
    newUser?: UsersObject;
    actionType: "GET" | "POST" | "PUT" | "DELETE";
  },
  { rejectValue: string }
>("users/fetchUsers", async ({ id, updatedUser, newUser, actionType }) => {
  const apiUrl = "http://localhost:4000/users";
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
      case "POST":
        if (newUser) {
          resp = await axios.post<UsersObject>(apiUrl, newUser);
          return [resp.data];
        } else {
          throw new Error("Invalid POST request arguments");
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
    isEditing: (state, action) => {
      state.editing = action.payload;
    },
    isAdding: (state, action) => {
      state.adding = action.payload;
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

        if (action.meta.arg.actionType === "POST") {
          const [newUser] = action.payload;
          state.usersData = [...state.usersData, newUser];
          state.successMessage = "User added successfully";
        }

        if (action.meta.arg.actionType === "DELETE") {
          const [deletedUser] = action.payload;
          state.usersData = state.usersData.filter(
            (user) => user._id !== deletedUser._id
          );
          state.successMessage = "User deleted successfully";
        }

        if (action.meta.arg.actionType === "PUT") {
          const [updatedUser] = action.payload;
          state.usersData = state.usersData.map((user) =>
            user._id === updatedUser._id ? updatedUser : user
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

        if (action.meta.arg.actionType === "POST") {
          state.errorMessage = "Failed to add new user";
        }
      });
  },
});

export const { isDeleting, isEditing, isAdding } = usersSlice.actions;

export default usersSlice.reducer;
