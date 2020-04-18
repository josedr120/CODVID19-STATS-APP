import { FETCH_ALL_COUNTRIES_STATS } from '../actions/types';

const initalState = {
   stats: []
};

export default function(state = initalState, action) {
   switch (action.type) {
      case FETCH_ALL_COUNTRIES_STATS:
         return {
            stats: action.allCountries
         };
      default:
         return state;
   }
}
