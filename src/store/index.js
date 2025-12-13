import { configureStore } from '@reduxjs/toolkit'
import globalStatsReducer from './slices/globalStatsSlice'
import usStatesReducer from './slices/usStatesSlice'
import countriesReducer from './slices/countriesSlice'

export const store = configureStore({
  reducer: {
    globalStats: globalStatsReducer,
    usStates: usStatesReducer,
    countries: countriesReducer
  }
})
