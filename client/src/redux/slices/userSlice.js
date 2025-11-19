import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/axios';

// Async thunks
export const fetchFavourites = createAsyncThunk(
  'user/fetchFavourites',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.get('/users/favourites');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch favourites');
    }
  }
);

export const addToFavourites = createAsyncThunk(
  'user/addToFavourites',
  async (schemeId, { rejectWithValue }) => {
    try {
      const response = await API.post(`/users/favourites/${schemeId}`);
      return schemeId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add to favourites');
    }
  }
);

export const removeFromFavourites = createAsyncThunk(
  'user/removeFromFavourites',
  async (schemeId, { rejectWithValue }) => {
    try {
      await API.delete(`/users/favourites/${schemeId}`);
      return schemeId;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove from favourites');
    }
  }
);

// Initial state
const initialState = {
  favourites: [],
  loading: false,
  error: null,
};

// Slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Favourites
      .addCase(fetchFavourites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFavourites.fulfilled, (state, action) => {
        state.loading = false;
        state.favourites = action.payload;
      })
      .addCase(fetchFavourites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add to Favourites
      .addCase(addToFavourites.fulfilled, (state, action) => {
        // Will refetch to get full scheme details
      })
      // Remove from Favourites
      .addCase(removeFromFavourites.fulfilled, (state, action) => {
        state.favourites = state.favourites.filter(s => s._id !== action.payload);
      });
  },
});

export default userSlice.reducer;
