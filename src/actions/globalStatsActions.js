import { FETCH_GLOBAL_STATS } from './types';
import axios from 'axios';

export const fetchGlobalStats = () => dispatch => {
   axios
      .get('https://corona.lmao.ninja/all')
      .then(res => res.data)
      .then(data =>
         dispatch({
            type: FETCH_GLOBAL_STATS,
            globalStats: data
         })
      )
      .catch(err => console.log(err));
};
