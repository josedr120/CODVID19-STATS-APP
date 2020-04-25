import { FETCH_ALL_US_STATES_STATS } from '../actions/types';

const initialState = {
   allUsStats: {},
};

export default function (allUsStats = initialState, action) {
   switch (action.type) {
      case FETCH_ALL_US_STATES_STATS:
         return {
            allUsStats: action.allUsStateStats,
         };
      default:
         return allUsStats;
   }
}
