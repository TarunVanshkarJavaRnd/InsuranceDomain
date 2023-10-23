import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an async thunk action to fetch policies
export const fetchPolicies = createAsyncThunk('policies/fetchPolicies', async () => {
  const response = await axios.get('https://652ff7016c756603295e0287.mockapi.io/insurance-domain');
  return response.data;
});

const policySlice = createSlice({
  name: 'policies',
  initialState: {
    policies: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolicies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPolicies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.policies = action.payload;
      })
      .addCase(fetchPolicies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default policySlice.reducer;
