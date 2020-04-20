import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane } from 'mdbreact';

class Body extends Component {
   state = {
      activeItemJustified: '1',
   };

   toggleJustified = (tab) => (e) => {
      if (this.state.activeItemJustified !== tab) {
         this.setState({
            activeItemJustified: tab,
         });
      }
   };

   render() {
      return (
         <Fragment>
            <MDBContainer className='mb-5'>
               <MDBNav tabs className='nav-justified' color='indigo'>
                  <MDBNavItem>
                     <MDBNavLink link to='#' active={this.state.activeItemJustified === '1'} onClick={this.toggleJustified('1')} role='tab'>
                        US State Totals
                     </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                     <MDBNavLink link to='#' active={this.state.activeItemJustified === '2'} onClick={this.toggleJustified('2')} role='tab'>
                        All Countries Totals
                     </MDBNavLink>
                  </MDBNavItem>
               </MDBNav>
               <MDBTabContent className='card' activeItem={this.state.activeItemJustified}>
                  <MDBTabPane tabId='1' role='tabpanel'></MDBTabPane>
                  <MDBTabPane tabId='2' role='tabpanel'></MDBTabPane>
               </MDBTabContent>

               <br />
               <hr />
               <br />
            </MDBContainer>
         </Fragment>
      );
   }
}

export default Body;
