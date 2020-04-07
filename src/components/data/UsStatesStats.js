import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBSelect, MDBInput, MDBSelectInput, MDBFormInline, MDBSelectOptions, MDBSelectOption, MDBCard, MDBCardBody, MDBDataTable } from 'mdbreact';
import { HorizontalBar, Pie, Bar } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsStatesStats } from '../../actions/usStatesStatsActions';

class UsStatesStats extends Component {
   state = {
      select: '',
      radio: '',
   };

   componentDidMount() {
      this.props.fetchUsStatesStats();
   }

   handleChange = (e) => {
      this.setState({ select: e.target.value });
   };

   onClick = (nr) => () => {
      this.setState({
         radio: nr,
      });
   };

   render() {
      const { select, radio } = this.state;
      const { states } = this.props;

      if (!states) {
         return <h1>Loading</h1>;
      }

      let names = [];
      let dataChart = [];
      let rows = [];

      states.forEach((state) => {
         const statesNames = state.state;

         names.push(statesNames);
         if (select === statesNames) {
            dataChart.push(state.cases, state.todayCases, state.deaths, state.todayDeaths, state.active, state.tests, state.testsPerOneMillion);
         }

         rows.push({
            city: state.state,
            cases: state.cases,
            today_cases: state.todayCases,
            deaths: state.deaths,
            today_deaths: state.todayDeaths,
            active: state.active,
         });
      });

      const onShow = () => {
         if (select) {
            const USData = {
               labels: ['Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Active', 'Test', 'Tests Per One Million'],
               datasets: [
                  {
                     label: select,
                     data: dataChart,
                     fill: false,
                     backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                     hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
                     borderWidth: 2,
                  },
               ],
            };

            return <Bar data={USData} options={{ responsive: true }} />;
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
            <MDBContainer className='my-4'>
               {/* <select onChange={this.handleChange} className='browser-default custom-select'>
                  <option selected disabled>
                     Choose your option
                  </option>
                  {names.map((res) => (
                     <option key={res} value={res}>
                        {res}
                     </option>
                  ))}
               </select> */}

               {/* Material Select */}
               {/* <MDBSelect label='Choose State'>
                  <MDBSelectInput selected='Choose your country' />
                  <MDBSelectOptions>
                     <MDBSelectOption disabled>Choose your country</MDBSelectOption>
                     {names.map((res) => (
                        <MDBSelectOption key={res} value={res}>
                           {res}
                        </MDBSelectOption>
                     ))}
                  </MDBSelectOptions>
               </MDBSelect> */}
               <br />
               {/* {onShow()} */}

               {showTable()}
            </MDBContainer>
         </Fragment>
      );
   }
}

UsStatesStats.propTypes = {
   fetchUsStatesStats: PropTypes.func.isRequired,
   states: PropTypes.array.isRequired,
};

const mapToStateToProps = (state) => ({
   states: state.states.stats,
});

export default connect(mapToStateToProps, { fetchUsStatesStats })(UsStatesStats);
