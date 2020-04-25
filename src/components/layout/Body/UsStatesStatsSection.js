import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBCardTitle, MDBBadge } from 'mdbreact';
import UsStatesStats from '../../data/UsStatesStats';

export class UsStatesStatsSection extends Component {
   render() {
      return (
         <Fragment>
            <MDBContainer className='my-4'>
               <MDBCard border='red'>
                  <MDBCardTitle className='my-5 text-center' tag='h1'>
                     US State Stats
                  </MDBCardTitle>
                  <MDBCardBody>
                     <UsStatesStats />
                  </MDBCardBody>
               </MDBCard>
            </MDBContainer>
         </Fragment>
      );
   }
}

export default UsStatesStatsSection;
