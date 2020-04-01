import { combineReducers } from 'redux';
import globalStatsReducer from './globalStatsReducer';

export default combineReducers({
   globalStats: globalStatsReducer
});
