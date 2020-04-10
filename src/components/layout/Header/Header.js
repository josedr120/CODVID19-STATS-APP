import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBJumbotron } from 'mdbreact';
import GlobalStatsAPI from '../../data/GlobalStatsAPI';

class Header extends Component {
   render() {
      return (
         <Fragment>
            <MDBContainer className='mt-4 text-center'>
               <MDBRow>
                  <MDBCol>
                     <MDBJumbotron className='z-depth-4 red'>
                        <h5 className='mb-5 display-4 customTitle'>
                           <i className='rotate fas fa-globe-americas rotate'></i> Global Stats <i className='rotate fas fa-globe-americas'></i>
                        </h5>
                        <section className='text-center my-5'>
                           <MDBRow>
                              <GlobalStatsAPI />
                           </MDBRow>
                        </section>
                     </MDBJumbotron>
                  </MDBCol>
               </MDBRow>
            </MDBContainer>
         </Fragment>
      );
   }
}

export default Header;
