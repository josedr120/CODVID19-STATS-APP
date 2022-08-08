import { FETCH_ALL_COUNTRIES_STATS } from './types';
import axios from 'axios';

export const fetchAllCountriesStats = () => (dispatch) => {
   axios
      .get('https://disease.sh/v3/covid-19/countries')
      .then((res) =>
         dispatch({
            type: FETCH_ALL_COUNTRIES_STATS,
            allCountries: res.data,
         })
      )
      .catch((err) => console.log(err));
};
