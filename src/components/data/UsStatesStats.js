import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBSelect, MDBInput, MDBSelectInput, MDBFormInline, MDBSelectOptions, MDBSelectOption, MDBCard, MDBCardBody, MDBDataTable } from 'mdbreact';
import { HorizontalBar, Pie } from 'react-chartjs-2';
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

      //Each Stats Variables
      let cases;
      let todayCases;
      let deaths;
      let todayDeaths;
      let active;
      let USDataTable;

      states.map((state) => {
         const statesNames = state.state;

         names.push(statesNames);
         if (select === statesNames) {
            dataChart.push(state.cases, state.todayCases, state.deaths, state.todayDeaths, state.active);
         }

         // Each Stats
         cases = state.cases;
         todayCases = state.todayCases;
         deaths = state.deaths;
         todayDeaths = state.todayDeaths;
         active = state.active;

         USDataTable = {
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
            rows: [
               {
                  city: statesNames,
                  cases: cases,
                  today_cases: todayCases,
                  deaths: deaths,
                  today_deaths: todayDeaths,
                  active: active,
               },
            ],
         };
      });

      const onShow = () => {
         if (select && radio === 1) {
            const USData = {
               labels: ['Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Active'],
               datasets: [
                  {
                     label: select,
                     data: dataChart,
                     fill: true,
                     backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'],
                     hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774'],
                     borderWidth: 2,
                  },
               ],
            };

            return (
               <Fragment>
                  <HorizontalBar data={USData} options={{ responsive: true }} />
               </Fragment>
            );
         } else if (radio === 2) {
            return <MDBDataTable striped hover data={USDataTable} />;
         }
      };

      return (
         <Fragment>
            <MDBContainer className={'mb-5 pb-5 mt-4'}>
               <select onChange={this.handleChange} className='browser-default custom-select'>
                  <option selected disabled>
                     Choose your option
                  </option>
                  {names.map((res) => (
                     <option key={res} value={res}>
                        {res}
                     </option>
                  ))}
               </select>
               <MDBFormInline>
                  <MDBInput onClick={this.onClick(1)} checked={this.state.radio === 1 ? true : false} label='Chart' type='radio' id='radio1' containerClass='mr-5' />
                  <MDBInput onClick={this.onClick(2)} checked={this.state.radio === 2 ? true : false} label='Table' type='radio' id='radio2' containerClass='mr-5' />
               </MDBFormInline>
               {/* <MDBSelect onChange={this.handleChange} label='Choose State'>
                        <MDBSelectInput selected='Choose your country' />
                        <MDBSelectOptions>
                           <MDBSelectOption disabled>Choose your country</MDBSelectOption>
                           {names.map(res => (
                              <MDBSelectOption key={res} value={res}>
                                 {res}
                              </MDBSelectOption>
                           ))}
                        </MDBSelectOptions>
                     </MDBSelect> */}
               <br />
               {onShow()}
            </MDBContainer>
         </Fragment>
      );
   }
}

const mapToStateToProps = (state) => ({
   states: state.states.stats,
});

export default connect(mapToStateToProps, { fetchUsStatesStats })(UsStatesStats);
