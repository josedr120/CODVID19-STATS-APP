import React, { Component, Fragment } from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdbreact';

class Footer extends Component {
   render() {
      return (
         <Fragment>
            <MDBFooter color='indigo' className='font-small darken-3 pt-0'>
               <MDBContainer>
                  <MDBRow>
                     <MDBCol md='12' className='py-5'>
                        <div className='mb-5 flex-center'>
                           <a href=''>
                              <MDBIcon fab size='3x' icon='github' />
                           </a>
                        </div>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
               <div className='footer-copyright text-center py-3'>
                  <MDBContainer fluid>&copy; {new Date().getFullYear()} Copyright </MDBContainer>
               </div>
            </MDBFooter>
         </Fragment>
      );
   }
}

export default Footer;
