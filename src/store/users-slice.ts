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
  void,
  { rejectValue: string }
>("users/fetchUsers", async () => {
  const apiUrl = "https://jsonplaceholder.typicode.com/users";
  try {
    const response = await axios.get<UsersObject[]>(apiUrl);
    const data = response.data;
    const convertedUserObj = data.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        address: {
          street: user.address.street,
          suite: user.address.suite,
          city: user.address.city,
          zipcode: user.address.zipcode,
          geo: {
            lat: user.address.geo.lat,
            lng: user.address.geo.lng,
          },
        },
      };
    });
    return convertedUserObj;
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
    isDeleting: (state) => {
      state.deleting = true;
    },
    removeUser: (state) => {},
    isEditing: (state) => {
      state.editing = true;
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
