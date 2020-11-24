import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBSelect, MDBInput, MDBAlert, MDBSelectInput, MDBFormInline, MDBSelectOptions, MDBSelectOption, MDBCard, MDBCardBody, MDBDataTableV5, MDBRow, MDBCol } from 'mdbreact';
import { HorizontalBar, Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTodayUsStatesStats } from '../../redux/actions/usStatesTodayStatsActions';
import { fetchYesterdayUsStatesStats } from '../../redux/actions/usStatesYesterdayStatsActions';
import { fetchAllUsStateStats } from '../../redux/actions/AllUsStateStatsActions';

class UsStatesStats extends Component {
   state = {
      select: '',
      options: [],
      radio: 1,
   };

   componentDidMount() {
      this.props.fetchTodayUsStatesStats();
      this.props.fetchYesterdayUsStatesStats();
      this.props.fetchAllUsStateStats();
   }

   handleSelect = (value) => {
      this.setState({ select: value[0] });
   };

   render() {
      const { select, options, radio } = this.state;
      const { today_us_states_stats, yesterday_us_states_stats, allUsStateStats } = this.props;
      const { updated, cases, todayCases, deaths, todayDeaths, recovered, active, critical, CPOM, DOPM, tests, TOPM } = allUsStateStats;

      if (!today_us_states_stats && !yesterday_us_states_stats) {
         return <h1>Loading</h1>;
      }

      let stateNames = [];
      let yesterdayData = [];
      let todayData = [];
      let allUsStats = [];
      let rows = [];

      // yesterday_us_states_stats.map((res) => {
      //    if (select === res.state) {
      //       yesterdayData.push(res.cases / 100, res.todayCases / 100, res.deaths / 100, res.todayDeaths / 100, res.active / 100, res.tests / 100, res.testsPerOneMillion / 100);
      //    }
      // });

      today_us_states_stats.map((res) => {
         stateNames.push(res.state);
         const LargeNum = '1,587,421,695,147';
         const test = '24,724';

         if (select === res.state) {
            todayData.push(Math.round(res.cases / 100), Math.round(res.todayCases / 100), Math.round(res.deaths / 100), Math.round(res.todayDeaths / 100), Math.round(res.active / 100), Math.round(res.tests / 100), Math.round(res.testsPerOneMillion / 100));
         } else if (select === '') {
            allUsStats.push(
               Math.round(updated / 10000000),
               Math.round(cases),
               Math.round(todayCases),
               Math.round(deaths),
               Math.round(todayDeaths),
               Math.round(recovered),
               Math.round(active),
               Math.round(critical),
               Math.round(CPOM),
               Math.round(DOPM),
               Math.round(tests / 100),
               Math.round(TOPM)
            );
         }

         options.push({
            text: res.state,
            value: res.state,
         });

         rows.push({
            city: res.state,
            cases: res.cases,
            todayCases: res.todayCases,
            deaths: res.deaths,
            todayDeaths: res.todayDeaths,
            active: res.active,
            tests: res.tests,
            testsPerOneMillion: res.testsPerOneMillion,
         });
      });

      const showChart = () => {
         const PerUsStateStats = {
            labels: ['Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Active', 'Tests', 'TOPM'],
            datasets: [
               {
                  label: `Today Data - ${select}`,
                  data: todayData,
                  fill: true,
                  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                  borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
                  borderWidth: 1,
               },
               // {
               //    label: 'Yesterday Data',
               //    data: yesterdayData,
               //    fill: true,
               //    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
               //    borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
               //    borderWidth: 1,
               // },
            ],
         };

         const allUsStateStats = {
            labels: ['Updated', 'Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Recovered', 'Active', 'Critical', 'COPM', 'DOPM', 'Tests', 'TOPM'],
            datasets: [
               {
                  label: 'All US State Data',
                  data: allUsStats,
                  fill: true,
                  backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
                  borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
                  borderWidth: 1,
               },
               // {
               //    label: 'Yesterday Data',
               //    data: yesterdayData,
               //    fill: true,
               //    backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(255, 205, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(153, 102, 255, 0.2)', 'rgba(201, 203, 207, 0.2)'],
               //    borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)', 'rgb(255, 205, 86)', 'rgb(75, 192, 192)', 'rgb(54, 162, 235)', 'rgb(153, 102, 255)', 'rgb(201, 203, 207)'],
               //    borderWidth: 1,
               // },
            ],
         };

         if (select) {
            return (
               <Fragment>
                  <HorizontalBar data={PerUsStateStats} options={{ responsive: true }} />
               </Fragment>
            );
         } else {
            return (
               <Fragment>
                  <HorizontalBar data={allUsStateStats} options={{ responsive: true }} />
               </Fragment>
            );
         }
      };

      const showTable = () => {
         const data = {
            columns: [
               {
                  label: 'City',
                  field: 'city',
                  sort: 'asc',
                  width: 200,
               },
               {
                  label: 'Cases',
                  field: 'cases',
                  sort: 'asc',
                  width: 270,
               },
               {
                  label: 'Today Cases',
                  field: 'todayCases',
                  sort: 'asc',
                  width: 200,
               },
               {
                  label: 'Deaths',
                  field: 'deaths',
                  sort: 'asc',
                  width: 100,
               },
               {
                  label: 'Today Deaths',
                  field: 'todayDeaths',
                  sort: 'asc',
                  width: 150,
               },
               {
                  label: 'Active',
                  field: 'active',
                  sort: 'asc',
                  width: 100,
               },
               {
                  label: 'Tests',
                  field: 'tests',
                  sort: 'asc',
                  width: 100,
               },
               {
                  label: 'TPOM',
                  field: 'testsPerOneMillion',
                  sort: 'asc',
                  width: 100,
               },
            ],
         };
         data.rows = rows;
         return (
            <Fragment>
               <h1 className='my-5 text-center font-weight-bold'>Data - Table</h1>
               <hr />
               <MDBDataTableV5 className='my-5' entriesOptions={[10, 20, 50]} entries={20} data={data} responsive={true} proSelect materialSearch />
            </Fragment>
         );
      };

      return (
         <Fragment>
            {select ? (
               <MDBAlert dismiss color='info'>
                  Note: TOPM means Tests Per One Million
               </MDBAlert>
            ) : null}
            <div className='my-5'>
               <MDBSelect options={options} getValue={this.handleSelect} selected='Choose your option' color='primary' label='Choose county' />
            </div>

            {showChart()}
            <hr />
            {/* Table */}

            {showTable()}
         </Fragment>
      );
   }
}

UsStatesStats.propTypes = {
   fetchTodayUsStatesStats: PropTypes.func.isRequired,
   fetchYesterdayUsStatesStats: PropTypes.func.isRequired,
   today_us_states_stats: PropTypes.array.isRequired,
   yesterday_us_states_stats: PropTypes.array.isRequired,
   allUsStateStats: PropTypes.object.isRequired,
};

const mapToStateToProps = (state) => ({
   today_us_states_stats: state.today_us_states_stats.todayStats,
   yesterday_us_states_stats: state.yesterday_us_states_stats.yesterdayStats,
   allUsStateStats: state.allUsStateStats.allUsStats,
});

export default connect(mapToStateToProps, { fetchTodayUsStatesStats, fetchYesterdayUsStatesStats, fetchAllUsStateStats })(UsStatesStats);
