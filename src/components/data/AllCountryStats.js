import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllCountriesStats } from '../../actions/allCountriesStatsActions';
import { MDBContainer } from 'mdbreact';
import { Pie } from 'react-chartjs-2';

class AllCountryStats extends Component {
   state = {
      select: ''
   };

   componentDidMount() {
      this.props.fetchAllCountriesStats();
   }

   handleChange = e => {
      this.setState({ select: e.target.value });
   };

   render() {
      const { select } = this.state;
      const { allCountries } = this.props;

      if (!allCountries) {
         return <h1>Loading</h1>;
      }

      let countries = [];
      let data = [];

      allCountries.map(res => {
         const countryNames = res.country;

         countries.push(countryNames);

         if (select === countryNames) {
            data.push(res.cases, res.todayCases, res.deaths, res.todayDeaths, res.active, res.critical, res.casesPerOneMillion, res.deathsPerOneMillion, res.updated);
         }
      });

      const onShow = () => {
         if (select) {
            const AllCountriesData = {
               labels: ['Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Active', 'Critical', 'Cases Per One Million', 'Deaths Per One Million', 'Updated'],
               datasets: [
                  {
                     data: data,
                     backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
                     hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#DA92DB']
                  }
               ]
            };

            return <Pie data={AllCountriesData} options={{ responsive: true }} />;
         }
      };

      return (
         <Fragment>
            <MDBContainer className='mt-3 pt-3'>
               <select onChange={this.handleChange} className='browser-default custom-select'>
                  <option selected disabled>
                     Choose your option
                  </option>
                  {countries.map(country => (
                     <option key={country} value={country}>
                        {country}
                     </option>
                  ))}
               </select>
               {onShow()}
            </MDBContainer>
         </Fragment>
      );
   }
}

const mapStateToProps = state => ({
   allCountries: state.allCountries.stats
});

export default connect(mapStateToProps, { fetchAllCountriesStats })(AllCountryStats);
