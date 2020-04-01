import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import Header from './components/layout/Header/Header';
import store from './store';

class App extends Component {
   render() {
      return (
         <Provider store={store}>
            <Fragment>
               <Header />
            </Fragment>
         </Provider>
      );
   }
}

export default App;
