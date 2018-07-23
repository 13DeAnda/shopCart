import React from 'react';
import {Thumbnail, Button, Row, Col, Grid, Glyphicon} from 'react-bootstrap';

import ShopCart from '../ShopCart/ShopCart';

import './Products.css';

import _ from 'lodash';
export default class Products extends React.Component {

  constructor(props){
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.displayCart = this.displayCart.bind(this);

    this.state = {
      cart: {},
      cartTotalItems: 0,
      showCart: true,
      products: {
        'CH1': {
          'code' : 'CH1',
          'name' : 'Chai',
          'price': 3.11,
          'image': '/assets/ch1.jpg',
          'quantity': 0
        },
        'AP1': {
          'code' : 'AP1',
          'name' : 'Apples',
          'price': 6.00,
          'image': '/assets/ap1.jpg',
          'quantity': 0
        },
        'CF1': {
          'code' : 'CF1',
          'name' : 'Coffe',
          'price': 11.23,
          'image': '/assets/cf1.jpg',
          'quantity': 0
        },
        'MK1': {
          'code' : 'MK1',
          'name' : 'Milk',
          'price': 4.75,
          'image': '/assets/mk1.jpg',
          'quantity': 0
        },
        'OM1': {
          'code' : 'OM1',
          'name' : 'Oatmeal',
          'price': 3.71,
          'image': '/assets/om1.jpg',
          'quantity': 0
        }
      }
    };
  }
  render() {
    var {products, cart, cartTotalItems, showCart} = this.state;
    return (
      <Grid className='Products'>
        <Row className='shopCartHeader text-right'>
          <Button bsSize="large" onClick={this.displayCart}>
            <Glyphicon glyph="shopping-cart" /> ({cartTotalItems})
          </Button>
        </Row>
        <Row>
          <Col sm={8}>
            {_.map(products, function(product, index){
              return(
                <Thumbnail className='product text-center' src={product.image}  key={index}><br/>
                  <h4> $ {product.price}</h4>
                  <h6>{product.name} </h6> <br/>

                    <div className='buttons'>
                     {product.quantity > 0?
                          <div className='addbuttons'>
                            <Glyphicon glyph="minus-sign" onClick={()=> this.removeFromCart(product)} />

                            {product.quantity}
                          </div>
                        : '  '}
                        <div className='addbuttons'>
                          <Glyphicon glyph="plus-sign" onClick={() => this.addToCart(product)}/>
                        </div>
                    </div>
                </Thumbnail>
              );
            }.bind(this))}
          </Col>

          {showCart?
            <ShopCart cart={cart}
                      addToCart={this.addToCart}
                      removeFromCart={this.removeFromCart} />: null}
        </Row>
      </Grid>
    );
  }

  //functions

  addToCart(product){
    var cart = _.cloneDeep(this.state.cart);
    var cartTotalItems = _.cloneDeep(this.state.cartTotalItems);

    product.quantity++;

    cartTotalItems++;

    if(!cart[product.code]){
      cart[product.code] = product;
    }
    this.setState({cart: cart, cartTotalItems: cartTotalItems});
  }

  removeFromCart(product){
    var cart = _.cloneDeep(this.state.cart);
    var cartTotalItems = _.cloneDeep(this.state.cartTotalItems);

    product.quantity--;
    cartTotalItems--;

    if(product.quantity < 1){
      cart[product.code] = product;
    }
    this.setState({cart: cart, cartTotalItems: cartTotalItems});
  }

  displayCart(){
    this.setState({showCart: !this.state.showCart});
  }
}
