import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UsersObject {
  id: number;
  name: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
}

interface UsersState {
  usersData: UsersObject[];
  loading: boolean;
  error: string | null;
  deleting: boolean;
  editing: boolean;
}

const initialState: UsersState = {
  usersData: [],
  loading: false,
  error: null,
  deleting: false,
  editing: false,
};

export const fetchUsers = createAsyncThunk<
  UsersObject[],
  number | void,
  { rejectValue: string }
>("users/fetchUsers", async (id?) => {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";
  try {
    if (typeof id === "number") {
      const resp = await axios.get<UsersObject>(`${apiUrl}/${id}`);
      return [resp.data];
    }
    const resp = await axios.get<UsersObject[]>(apiUrl);
    return resp.data;
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
    editUser: (state, action: PayloadAction<number>) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.usersData = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong!";
      });
  },
});

export const { editUser, removeUser, isDeleting, isEditing } =
  usersSlice.actions;

export default usersSlice.reducer;
