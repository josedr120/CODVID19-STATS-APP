import { FETCH_TODAY_US_STATES_STATS } from './types';
import axios from 'axios';

export const fetchTodayUsStatesStats = () => (dispatch) => {
   axios
      .get('https://corona.lmao.ninja/v2/states')
      .then((res) =>
         dispatch({
            type: FETCH_TODAY_US_STATES_STATS,
            today_us_states_stats: res.data,
         })
      )
      .catch((err) => console.log(err));
};
