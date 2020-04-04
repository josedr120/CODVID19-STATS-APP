import { FETCH_ALL_COUNTRIES_STATS } from './types';
import axios from 'axios';

export const fetchAllCountriesStats = () => dispatch => {
   axios
      .get('https://corona.lmao.ninja/countries')
      .then(res =>
         dispatch({
            type: FETCH_ALL_COUNTRIES_STATS,
            allCountries: res.data
         })
      )
      .catch(err => console.log(err));
};
