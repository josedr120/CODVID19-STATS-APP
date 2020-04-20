import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBSelect, MDBInput, MDBAlert, MDBSelectInput, MDBFormInline, MDBSelectOptions, MDBSelectOption, MDBCard, MDBCardBody, MDBDataTable, MDBRow, MDBCol } from 'mdbreact';
import { HorizontalBar, Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTodayUsStatesStats } from '../../redux/actions/usStatesTodayStatsActions';
import { fetchYesterdayUsStatesStats } from '../../redux/actions/usStatesYesterdayStatsActions';
// import BarChart from '../BarChart';
// import PieChart from '../PieChart';

class UsStatesStats extends Component {
   state = {
      select: '',
      options: [],
      radio: 1,
   };

   componentDidMount() {
      this.props.fetchTodayUsStatesStats();
      this.props.fetchYesterdayUsStatesStats();
   }

   handleSelect = (value) => {
      this.setState({ select: value[0] });
   };

   render() {
      const { select, options, radio } = this.state;
      const { today_us_states_stats, yesterday_us_states_stats } = this.props;

      if (!today_us_states_stats && !yesterday_us_states_stats) {
         return <h1>Loading</h1>;
      }

      let stateNames = [];
      let yesterdayData = [];
      let todayData = [];
      let rows = [];

      // yesterday_us_states_stats.map((res) => {
      //    if (select === res.state) {
      //       yesterdayData.push(res.cases / 100, res.todayCases / 100, res.deaths / 100, res.todayDeaths / 100, res.active / 100, res.tests / 100, res.testsPerOneMillion / 100);
      //    }
      // });

      today_us_states_stats.map((res) => {
         stateNames.push(res.state);

         if (select === res.state) {
            todayData.push(Math.round(res.cases / 100), Math.round(res.todayCases / 100), Math.round(res.deaths / 100), Math.round(res.todayDeaths / 100), Math.round(res.active / 100), Math.round(res.tests / 100), Math.round(res.testsPerOneMillion / 100));
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
         const dataHorizontal = {
            labels: ['Cases', 'Today Cases', 'Deaths', 'Today Deaths', 'Active', 'Tests', 'TOPM'],
            datasets: [
               {
                  label: 'Today Data',
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

         const dataPie = {
            labels: ['Red', 'Green', 'Yellow', 'Grey', 'Dark Grey'],
            datasets: [
               {
                  data: todayData,
                  backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360', '#AC64AD'],
                  hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5', '#616774', '#DA92DB'],
               },
            ],
         };

         return (
            <Fragment>
               <HorizontalBar data={dataHorizontal} options={{ responsive: true }} />
            </Fragment>
         );
      };

      const showTable = () => {
         const data = {
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
                  label: 'Tests Per One Million',
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
               <MDBDataTable className='my-5' striped hover data={data} responsive={true} />
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
};

const mapToStateToProps = (state) => ({
   today_us_states_stats: state.today_us_states_stats.todayStats,
   yesterday_us_states_stats: state.yesterday_us_states_stats.yesterdayStats,
});

export default connect(mapToStateToProps, { fetchTodayUsStatesStats, fetchYesterdayUsStatesStats })(UsStatesStats);
