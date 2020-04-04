import React, { Component, Fragment } from 'react';
import { MDBContainer, MDBNav, MDBNavItem, MDBNavLink, MDBIcon, MDBTabContent, MDBTabPane } from 'mdbreact';
import UsStatesStats from '../../data/UsStatesStats';
import AllCountryStats from '../../data/AllCountryStats';

class Body extends Component {
   state = {
      activeItemJustified: '2'
   };

   toggleJustified = tab => e => {
      if (this.state.activeItemJustified !== tab) {
         this.setState({
            activeItemJustified: tab
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
                  <MDBNavItem>
                     <MDBNavLink link to='#' active={this.state.activeItemJustified === '3'} onClick={this.toggleJustified('3')} role='tab'>
                        <MDBIcon icon='envelope' /> Contact
                     </MDBNavLink>
                  </MDBNavItem>
               </MDBNav>
               <MDBTabContent className='card' activeItem={this.state.activeItemJustified}>
                  <MDBTabPane tabId='1' role='tabpanel'>
                     <UsStatesStats />
                  </MDBTabPane>
                  <MDBTabPane tabId='2' role='tabpanel'>
                     <AllCountryStats />
                  </MDBTabPane>
                  <MDBTabPane tabId='3' role='tabpanel'>
                     <p className='mt-2'>
                        Etsy mixtape wayfarers, ethical wes anderson tofu before they sold out mcsweeney's organic lomo retro fanny pack lo-fi farm-to-table readymade. Messenger bag gentrify pitchfork tattooed craft beer, iphone skateboard locavore carles etsy salvia banksy
                        hoodie helvetica. DIY synth PBR banksy irony. Leggings gentrify squid 8-bit cred pitchfork. Williamsburg banh mi whatever gluten-free, carles pitchfork biodiesel fixie etsy retro mlkshk vice blog. Scenester cred you probably haven't heard of them, vinyl
                        craft beer blog stumptown. Pitchfork sustainable tofu synth chambray yr.
                     </p>
                  </MDBTabPane>
               </MDBTabContent>
            </MDBContainer>
         </Fragment>
      );
   }
}

export default Body;
