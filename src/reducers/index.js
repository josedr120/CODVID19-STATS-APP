import { combineReducers } from 'redux';
import globalStatsReducer from './globalStatsReducer';
import UsStatesStatsReducer from './UsStatesStatsReducer';
import allCountriesReducer from './allCountriesStatsReducer';

export default combineReducers({
   globalStats: globalStatsReducer,
   states: UsStatesStatsReducer,
   allCountries: allCountriesReducer
});
