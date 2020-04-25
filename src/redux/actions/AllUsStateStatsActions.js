import { FETCH_ALL_US_STATES_STATS } from './types';
import axios from 'axios';

export const fetchAllUsStateStats = () => (dispatch) => {
   axios
      .get('https://corona.lmao.ninja/v2/countries/USA')
      .then((res) =>
         dispatch({
            type: FETCH_ALL_US_STATES_STATS,
            allUsStateStats: res.data,
         })
      )
      .catch((err) => console.log(err));
};
