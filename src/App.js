import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './components/layout/Header/Header';
import store from './store';
import Body from './components/layout/Body/Body';
import Footer from './components/layout/Footer/Footer';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Fragment>
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
