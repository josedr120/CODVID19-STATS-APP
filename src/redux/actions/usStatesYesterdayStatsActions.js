import { FETCH_YESTERDAY_US_STATES_STATS } from './types';
import axios from 'axios';

export const fetchYesterdayUsStatesStats = () => (dispatch) => {
   axios
      .get('https://corona.lmao.ninja/v2/states?yesterday=true')
      .then((res) =>
         dispatch({
            type: FETCH_YESTERDAY_US_STATES_STATS,
            yesterday_us_states_stats: res.data,
         })
      )
      .catch((err) => console.log(err));
};
