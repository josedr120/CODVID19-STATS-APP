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
                  <MDBJumbotron className='customHeader'>
                     <h2 className='h1 display-3 hello'>Hello, world!</h2>
                     <p className='lead'>Welcome to my app, this basic but powerfull, CODVID-19 Stats Tracker, I made to help people track the daily stats. The data is updated in realtime, every hour+.</p>
                     <hr className='my-2' />
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
