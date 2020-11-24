import React, { Component, Fragment } from 'react';
import { MDBCol, MDBRow, MDBCard, MDBCardHeader, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardFooter, MDBAnimation } from 'mdbreact';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchGlobalStats } from '../../redux/actions/globalStatsActions';
import CountUp from 'react-countup';

class GlobalStatsAPI extends Component {
   componentDidMount() {
      this.props.fetchGlobalStats();
   }

   render() {
      const { updated, cases, todayCases, deaths, todayDeaths, recovered, active, critical, casesPerOneMillion, deathsPerOneMillion, tests, testsPerOneMillion, continent, affectedCountries } = this.props.globalStats;

      if (!updated) {
         return <h1>Loading</h1>;
      }

      return (
         <Fragment>
            <MDBCard border='indigo' text='black' className='mb-5 text-center'>
               <MDBCardBody>
                  <h5 className='display-4 customTitle'>
                     <i className='rotate fas fa-globe-americas rotate'></i> Global Stats <i className='rotate fas fa-globe-americas'></i>
                  </h5>
               </MDBCardBody>
            </MDBCard>

            <MDBRow center>
               <MDBCol md='4'>
                  <MDBCard border='info' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Updated</MDBCardHeader>
                     <MDBCardBody className='text-info'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={updated} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                     {/* <MDBCardFooter transparent border='success'>
                        <small>Last Updated</small>
                     </MDBCardFooter> */}
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='danger' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Cases</MDBCardHeader>
                     <MDBCardBody className='text-danger'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={cases} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                     {/* <MDBCardFooter color='danger-color'></MDBCardFooter> */}
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='danger' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Cases Today</MDBCardHeader>
                     <MDBCardBody className='text-danger'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={todayCases} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='dark' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Deaths</MDBCardHeader>
                     <MDBCardBody className='text-dark'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={deaths} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='dark' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Deaths Today</MDBCardHeader>
                     <MDBCardBody className='text-dark'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={todayDeaths} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='success' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Recovered</MDBCardHeader>
                     <MDBCardBody className='text-success'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={recovered} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='warning' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Active</MDBCardHeader>
                     <MDBCardBody className='text-warning'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={active} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='warning' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Critical</MDBCardHeader>
                     <MDBCardBody className='text-warning'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={critical} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='warning' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Cases Per One Million</MDBCardHeader>
                     <MDBCardBody className='text-warning'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={casesPerOneMillion} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='warning' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Deaths Per One Million</MDBCardHeader>
                     <MDBCardBody className='text-warning'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={deathsPerOneMillion} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='warning' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Test</MDBCardHeader>
                     <MDBCardBody className='text-warning'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={tests} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='warning' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Tests Per One Million</MDBCardHeader>
                     <MDBCardBody className='text-warning'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={testsPerOneMillion} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='warning' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Continent</MDBCardHeader>
                     <MDBCardBody className='text-warning'>
                        <MDBCardTitle tag='h5'>{continent}</MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>

               <MDBCol md='4'>
                  <MDBCard border='primary' className='mb-5' style={{ maxWidth: '18rem' }}>
                     <MDBCardHeader>Affected Countries</MDBCardHeader>
                     <MDBCardBody className='text-primary'>
                        <MDBCardTitle tag='h5'>
                           <CountUp end={affectedCountries} separator=',' duration={2.75} />
                        </MDBCardTitle>
                     </MDBCardBody>
                  </MDBCard>
               </MDBCol>
            </MDBRow>
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
