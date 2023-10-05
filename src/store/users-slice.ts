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
}

const initialState: UsersState = {
  usersData: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<
  UsersObject[],
  void,
  { rejectValue: string }
>("users/fetchUsers", async (_, thunkAPI) => {
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
    return thunkAPI.rejectWithValue("Failed to fetch issues.");
  }
});

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    editUser: (state, action: PayloadAction<number>) => {},
    removeUser: (state) => {},
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

export const { editUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
