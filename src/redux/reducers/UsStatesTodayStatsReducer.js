import { FETCH_TODAY_US_STATES_STATS } from '../actions/types';

const initialState = {
   todayStats: [],
};

export default function (todayStats = initialState, action) {
   switch (action.type) {
      case FETCH_TODAY_US_STATES_STATS:
         return {
            todayStats: action.today_us_states_stats,
         };
      default:
         return todayStats;
   }
}
