import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UsersApi } from './api';
import { User } from './types';

interface UsersState {
  users: User[];
  currentUser: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
}

const initialState: UsersState = {
  users: [],
  currentUser: null,
  status: 'idle',
  error: null,
  pagination: {
    currentPage: 1,
    itemsPerPage: 6,
  },
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await UsersApi.fetchAll();
  return response.data;
});

export const fetchUserById = createAsyncThunk(
  'users/fetchUserById',
  async (userId: number) => {
    const response = await UsersApi.fetchById(userId);
    return response.data;
  }
);

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(fetchUserById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.currentUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch user';
      });
  },
});

export const { setPage } = usersSlice.actions;
export default usersSlice.reducer;