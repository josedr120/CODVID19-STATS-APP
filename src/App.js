import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { MDBJumbotron, MDBContainer, MDBBtn, MDBCollapse } from 'mdbreact';
import Header from './components/layout/Header/Header';
import store from './store';
import Body from './components/layout/Body/Body';
import Footer from './components/layout/Footer/Footer';

class App extends Component {
   state = {
      collapseID: '',
   };

   toggleCollapse = (collapseID) => () => {
      this.setState((prevState) => ({
         collapseID: prevState.collapseID !== collapseID ? collapseID : '',
      }));
   };

   render() {
      return (
         <Provider store={store}>
            <Fragment>
               <MDBContainer className='my-5'>
                  <MDBJumbotron>
                     <h2 className='h1 display-3'>Hello, world!</h2>
                     <p className='lead'>Welcome to my app, this basic but powerfull, CODVID-19 Stats Tracker, I made to help people track the daily stats. The data is updated in realtime, every hour+.</p>
                     <hr className='my-2' />
                     <p>Click on the button to see developer info</p>
                     <MDBBtn color='primary' onClick={this.toggleCollapse('basicCollapse')} style={{ marginBottom: '1rem' }}>
                        Developer Info
                     </MDBBtn>
                     <MDBCollapse id='basicCollapse' isOpen={this.state.collapseID}>
                        <p>
                           Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                           in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                        </p>
                     </MDBCollapse>
                  </MDBJumbotron>
               </MDBContainer>
               <BrowserRouter>
                  <Header />
                  <Body />
                  <Footer />
               </BrowserRouter>
            </Fragment>
         </Provider>
      );
   }
}

export default App;
