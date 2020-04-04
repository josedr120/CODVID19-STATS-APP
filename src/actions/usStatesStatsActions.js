import { FETCH_US_STATES_STATS } from './types';
import axios from 'axios';

export const fetchUsStatesStats = () => dispatch => {
   axios
      .get('https://corona.lmao.ninja/states')
      .then(res =>
         dispatch({
            type: FETCH_US_STATES_STATS,
            states: res.data
         })
      )
      .catch(err => console.log(err));
};
