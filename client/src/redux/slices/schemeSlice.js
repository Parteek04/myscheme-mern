import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../utils/axios';

// Async thunks
export const fetchSchemes = createAsyncThunk(
  'schemes/fetchSchemes',
  async (params = {}, { rejectWithValue }) => {
    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await API.get(`/schemes?${queryString}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch schemes');
    }
  }
);

export const fetchSchemeBySlug = createAsyncThunk(
  'schemes/fetchSchemeBySlug',
  async (slug, { rejectWithValue }) => {
    try {
      const response = await API.get(`/schemes/${slug}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Scheme not found');
    }
  }
);

export const createScheme = createAsyncThunk(
  'schemes/createScheme',
  async (schemeData, { rejectWithValue }) => {
    try {
      const response = await API.post('/schemes', schemeData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create scheme');
    }
  }
);

export const updateScheme = createAsyncThunk(
  'schemes/updateScheme',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await API.put(`/schemes/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update scheme');
    }
  }
);

export const deleteScheme = createAsyncThunk(
  'schemes/deleteScheme',
  async (id, { rejectWithValue }) => {
    try {
      await API.delete(`/schemes/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete scheme');
    }
  }
);

export const fetchSuggestions = createAsyncThunk(
  'schemes/fetchSuggestions',
  async (query, { rejectWithValue }) => {
    try {
      const response = await API.get(`/schemes/suggestions?q=${query}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch suggestions');
    }
  }
);

// Initial state
const initialState = {
  schemes: [],
  currentScheme: null,
  suggestions: [],
  total: 0,
  page: 1,
  pages: 1,
  loading: false,
  error: null,
};

// Slice
const schemeSlice = createSlice({
  name: 'schemes',
  initialState,
  reducers: {
    clearCurrentScheme: (state) => {
      state.currentScheme = null;
    },
    clearSuggestions: (state) => {
      state.suggestions = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Schemes
      .addCase(fetchSchemes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchemes.fulfilled, (state, action) => {
        state.loading = false;
        state.schemes = action.payload.data;
        state.total = action.payload.total;
        state.page = action.payload.page;
        state.pages = action.payload.pages;
      })
      .addCase(fetchSchemes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Scheme by Slug
      .addCase(fetchSchemeBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSchemeBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.currentScheme = action.payload;
      })
      .addCase(fetchSchemeBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Scheme
      .addCase(createScheme.fulfilled, (state, action) => {
        state.schemes.unshift(action.payload);
      })
      // Update Scheme
      .addCase(updateScheme.fulfilled, (state, action) => {
        const index = state.schemes.findIndex(s => s._id === action.payload._id);
        if (index !== -1) {
          state.schemes[index] = action.payload;
        }
      })
      // Delete Scheme
      .addCase(deleteScheme.fulfilled, (state, action) => {
        state.schemes = state.schemes.filter(s => s._id !== action.payload);
      })
      // Fetch Suggestions
      .addCase(fetchSuggestions.fulfilled, (state, action) => {
        state.suggestions = action.payload;
      });
  },
});

export const { clearCurrentScheme, clearSuggestions } = schemeSlice.actions;
export default schemeSlice.reducer;
