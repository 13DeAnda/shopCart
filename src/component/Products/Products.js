import React from 'react';
import {Thumbnail, Button, Row, Col, Grid, Glyphicon, Collapse, Carousel} from 'react-bootstrap';

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
        <Row className='shopCartHeader '>
          <Col xs={8} className="text-center offers">
            <b> One year anniversary offers!</b>
            <Carousel>
              <Carousel.Item className='text-center'>
                 BOGO -- Buy-One-Get-One-Free Special on Coffee. (Unlimited)
              </Carousel.Item>
              <Carousel.Item className='text-center'>
                 APPL -- If you buy 3 or more bags of Apples, the price drops to $4.50.
              </Carousel.Item>
              <Carousel.Item className='text-center'>
                 CHMK -- Purchase a box of Chai and get milk free. (Limit 1)
              </Carousel.Item>
              <Carousel.Item className='text-center'>
                  APOM -- Purchase a bag of Oatmeal and get 50% off a bag of Apples
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col xs={4} className="text-right">
            <Button bsSize="large" onClick={this.displayCart}>
              <Glyphicon glyph="shopping-cart" /> ({cartTotalItems})
            </Button>
          </Col>
        </Row>
        <Row>
          <Col sm={10}>
            {_.map(products, function(product, index){
              return(
                <Thumbnail className='product text-center' src={product.image}  key={index}>
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
          <Collapse in={showCart} mountOnEnter={true}>
            <div className="cartContainer">
              <ShopCart cart={cart}
                      addToCart={this.addToCart}
                      removeFromCart={this.removeFromCart} />
            </div>
          </Collapse>
        </Row>
      </Grid>
    );
  }

  //functions
  addToCart(product){
    console.log(this.state.cart['CF1']);
    var cart = _.cloneDeep(this.state.cart);
    var cartTotalItems = _.cloneDeep(this.state.cartTotalItems);

    product.quantity++;
    cartTotalItems++;
    cart[product.code] = product;

    this.setState({cart: cart, cartTotalItems: cartTotalItems});
    console.log("the cart", this.state.cart);
  }

  removeFromCart(product){
    var cart = _.cloneDeep(this.state.cart);
    var cartTotalItems = _.cloneDeep(this.state.cartTotalItems);

    product.quantity--;
    cartTotalItems--;
    cart[product.code] = product;

    if(product.quantity < 1){
      delete cart[product.code];
    }

    this.setState({cart: cart, cartTotalItems: cartTotalItems});
  }

  displayCart(){
    this.setState({showCart: !this.state.showCart});
  }
}
