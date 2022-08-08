import { FETCH_GLOBAL_STATS } from './types';
import axios from 'axios';

export const fetchGlobalStats = () => (dispatch) => {
   axios
      .get('https://disease.sh/v3/covid-19/all?yesterday=false')
      .then((res) =>
         dispatch({
            type: FETCH_GLOBAL_STATS,
            globalStats: res.data,
         })
      )
      .catch((err) => console.log(err));
};
