import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE = 'https://disease.sh/v3/covid-19'

export const fetchGlobalStats = createAsyncThunk(
  'globalStats/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/all`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch global stats')
    }
  }
)

const globalStatsSlice = createSlice({
  name: 'globalStats',
  initialState: {
    data: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGlobalStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchGlobalStats.fulfilled, (state, action) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchGlobalStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = globalStatsSlice.actions
export default globalStatsSlice.reducer
