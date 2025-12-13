import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const API_BASE = 'https://disease.sh/v3/covid-19'

export const fetchTodayStats = createAsyncThunk(
  'usStates/fetchToday',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/states`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch today stats')
    }
  }
)

export const fetchYesterdayStats = createAsyncThunk(
  'usStates/fetchYesterday',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/states?yesterday=true`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch yesterday stats')
    }
  }
)

export const fetchUSAData = createAsyncThunk(
  'usStates/fetchUSAData',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/countries/USA`)
      return response.data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch USA data')
    }
  }
)

const usStatesSlice = createSlice({
  name: 'usStates',
  initialState: {
    today: [],
    yesterday: [],
    usaData: null,
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
      // Today stats
      .addCase(fetchTodayStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchTodayStats.fulfilled, (state, action) => {
        state.loading = false
        state.today = action.payload
      })
      .addCase(fetchTodayStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // Yesterday stats
      .addCase(fetchYesterdayStats.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchYesterdayStats.fulfilled, (state, action) => {
        state.loading = false
        state.yesterday = action.payload
      })
      .addCase(fetchYesterdayStats.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // USA data
      .addCase(fetchUSAData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUSAData.fulfilled, (state, action) => {
        state.loading = false
        state.usaData = action.payload
      })
      .addCase(fetchUSAData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = usStatesSlice.actions
export default usStatesSlice.reducer
