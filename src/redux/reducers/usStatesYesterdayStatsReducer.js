import { FETCH_YESTERDAY_US_STATES_STATS } from '../actions/types';

const initialState = {
   yesterdayStats: [],
};

export default function (yesterdayStats = initialState, action) {
   switch (action.type) {
      case FETCH_YESTERDAY_US_STATES_STATS:
         return {
            yesterdayStats: action.yesterday_us_states_stats,
         };
      default:
         return yesterdayStats;
   }
}
