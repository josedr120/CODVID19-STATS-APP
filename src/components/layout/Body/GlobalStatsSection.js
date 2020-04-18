import React, { Component, Fragment } from 'react';
import { MDBContainer } from 'mdbreact';
import GlobalStatsAPI from '../../data/GlobalStatsAPI';

export class GlobalStatsSection extends Component {
   render() {
      return (
         <Fragment>
            <MDBContainer>
               <GlobalStatsAPI />
            </MDBContainer>
         </Fragment>
      );
   }
}

export default GlobalStatsSection;
