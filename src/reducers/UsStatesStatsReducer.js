import { FETCH_US_STATES_STATS } from '../actions/types';

const initialState = {
   stats: []
};

export default function(state = initialState, action) {
   switch (action.type) {
      case FETCH_US_STATES_STATS:
         return {
            stats: action.states
         };
      default:
         return state;
   }
}
