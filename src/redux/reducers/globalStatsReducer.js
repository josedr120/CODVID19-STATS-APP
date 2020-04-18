import { FETCH_GLOBAL_STATS } from '../actions/types';

const initialState = {
   stats: {}
};

export default function(state = initialState, action) {
   switch (action.type) {
      case FETCH_GLOBAL_STATS:
         return {
            stats: action.globalStats
         };
      default:
         return state;
   }
}
