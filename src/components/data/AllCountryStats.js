import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAllCountriesStats } from '../../actions/allCountriesStatsActions';
import { MDBContainer, MDBDataTable } from 'mdbreact';
import { Bar } from 'react-chartjs-2';

class AllCountryStats extends Component {
   state = {
      select: '',
   };

   componentDidMount() {
      this.props.fetchAllCountriesStats();
   }

   handleChange = (e) => {
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
      let rows = [];

      allCountries.map((res) => {
         const countryNames = res.country;

         countries.push(countryNames);

         if (select === countryNames) {
            data.push(res.cases, res.todayCases, res.deaths, res.todayDeaths, res.active, res.critical, res.casesPerOneMillion, res.deathsPerOneMillion, res.tests, res.testsPerOneMillion);
         }

         rows.push({
            city: res.country,
            cases: res.cases,
            today_cases: res.todayCases,
            deaths: res.deaths,
            today_deaths: res.todayDeaths,
            active: res.active,
         });
      });

      const onShow = () => {
         if (select) {
            const AllCountriesData = {
               labels: ['Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Active', 'Critical', 'CPOM', 'DPOM', 'Tests', 'TPOM'],
               datasets: [
                  {
                     label: select,
                     data: data,
                     fill: false,
                     backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                     hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
                     borderWidth: 2,
                  },
               ],
            };

            return <Bar data={AllCountriesData} options={{ responsive: true }} />;
         }
      };

      const showTable = () => {
         let USDataTable = {
            columns: [
               {
                  label: 'City',
                  field: 'city',
                  sort: 'asc',
                  width: 150,
               },
               {
                  label: 'Cases',
                  field: 'cases',
                  sort: 'asc',
                  width: 150,
               },
               {
                  label: 'Today Cases',
                  field: 'today_cases',
                  sort: 'asc',
                  width: 270,
               },
               {
                  label: 'Deaths',
                  field: 'deaths',
                  sort: 'asc',
                  width: 200,
               },
               {
                  label: 'Today Deaths',
                  field: 'today_deaths',
                  sort: 'asc',
                  width: 100,
               },
               {
                  label: 'Active',
                  field: 'active',
                  sort: 'asc',
                  width: 150,
               },
            ],
         };
         USDataTable.rows = rows;

         return <MDBDataTable striped hover data={USDataTable} />;
      };

      return (
         <Fragment>
            <MDBContainer className='my-4'>{showTable()}</MDBContainer>
         </Fragment>
      );
   }
}

const mapStateToProps = (state) => ({
   allCountries: state.allCountries.stats,
});

export default connect(mapStateToProps, { fetchAllCountriesStats })(AllCountryStats);
