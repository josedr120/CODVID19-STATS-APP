import { combineReducers } from 'redux';
import globalStatsReducer from './globalStatsReducer';
import AllUsStateStatsReducer from './AllUsStateStatsReducer';
import UsStatesTodayStatsReducer from './UsStatesTodayStatsReducer';
import usStatesYesterdayStatsReducer from './usStatesYesterdayStatsReducer';
import allCountriesReducer from './allCountriesStatsReducer';

export default combineReducers({
   globalStats: globalStatsReducer,
   allUsStateStats: AllUsStateStatsReducer,
   today_us_states_stats: UsStatesTodayStatsReducer,
   yesterday_us_states_stats: usStatesYesterdayStatsReducer,
   allCountries: allCountriesReducer,
});
