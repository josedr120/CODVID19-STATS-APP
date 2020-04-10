import React, { Component, Fragment } from 'react';
import { MDBCol, MDBSimpleChart } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGlobalStats } from '../../actions/globalStatsActions';
import CountUp from 'react-countup';

export class GlobalStatsAPI extends Component {
   componentDidMount() {
      this.props.fetchGlobalStats();
   }

   render() {
      const { cases, deaths, recovered, updated, active, affectedCountries } = this.props.globalStats;

      if (!cases) {
         return <h1>Loading</h1>;
      }

      return (
         <Fragment>
            <MDBCol md='4'>
               <h5>Cases</h5>
               <div className='my-4 py-4 customCounter'>
                  <CountUp end={cases} separator=',' duration={2.75} />
               </div>
            </MDBCol>
            <MDBCol md='4'>
               <h5>Deaths</h5>
               <div className='my-4 py-4  customCounter'>
                  <CountUp end={deaths} separator=',' duration={2.75} />
               </div>
            </MDBCol>
            <MDBCol md='4'>
               <h5>Recovered</h5>
               <div className='my-4 py-4  customCounter'>
                  <CountUp end={recovered} separator=',' duration={2.75} />
               </div>
            </MDBCol>
            <MDBCol md='4'>
               <h5>Updated</h5>
               <div className='my-4 py-4  customCounter'>
                  <CountUp end={updated} separator=',' duration={2.75} />
               </div>
            </MDBCol>
            <MDBCol md='4'>
               <h5>Active</h5>
               <div className='my-4 py-4  customCounter'>
                  <CountUp end={active} separator=',' duration={2.75} />
               </div>
            </MDBCol>
            <MDBCol md='4'>
               <h5>Affected Countries</h5>
               <div className='my-4 py-4  customCounter'>
                  <CountUp end={affectedCountries} separator=',' duration={2.75} />
               </div>
            </MDBCol>
         </Fragment>
      );
   }
}

GlobalStatsAPI.propTypes = {
   fetchGlobalStats: PropTypes.func.isRequired,
   globalStats: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
   globalStats: state.globalStats.stats,
});

export default connect(mapStateToProps, { fetchGlobalStats })(GlobalStatsAPI);
