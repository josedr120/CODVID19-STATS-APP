import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBBadge } from 'mdbreact';
import AllCountryStats from '../../data/AllCountryStats';

class AllCountryStatsSection extends Component {
   render() {
      return (
         <Fragment>
            <MDBContainer className='my-4'>
               <MDBCard border='red'>
                  <MDBCardTitle className='my-5 text-center' tag='h1'>
                     All Country Stats
                  </MDBCardTitle>
                  <MDBCardBody>
                     <AllCountryStats />
                  </MDBCardBody>
               </MDBCard>
            </MDBContainer>
         </Fragment>
      );
   }
}

export default AllCountryStatsSection;
