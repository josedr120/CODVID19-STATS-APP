import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBJumbotron, MDBAnimation } from 'mdbreact';
import GlobalStatsAPI from '../../data/GlobalStatsAPI';
const logo = require('../../../assets/images/bacteria.png');

class Header extends Component {
   render() {
      return (
         <Fragment>
            <MDBAnimation reveal type='slideInDown'>
               <MDBCard color='indigo' text='white' className='mb-5 header'>
                  <MDBCardBody>
                     <h1 className='my-5 py-5 text-center customLogo'>
                        C <img src={logo} className='logo img-fluid' />D V I D - 19
                     </h1>
                  </MDBCardBody>
               </MDBCard>
            </MDBAnimation>
         </Fragment>
      );
   }
}

export default Header;
