import React, { Component } from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Header from './Header/Header';
import Products from './Products/Products';
import ShopCart from './ShopCart/ShopCart';
export default class App extends Component {
  render() {
    return (
    <div>
        <Header/>
        <Router>
          <div>
            <Route exact path="/" component={Products}/>
            <Route path="/shop-cart" component={ShopCart}/>
          </div>
        </Router>
    </div>
    );
  }
}
