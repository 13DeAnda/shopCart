import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Header from './Header/Header';
import Products from './Products/Products';
export default class App extends Component {
  render() {
    return (
    <div>
        <Header/>
        <Router>
          <div>
            <Route exact path="/" component={Products}/>
          </div>
        </Router>
    </div>
    );
  }
}
