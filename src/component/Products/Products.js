import React from 'react';
import {Thumbnail, Button, Row, Col, Grid, Glyphicon, Carousel} from 'react-bootstrap';

import ShopCart from '../ShopCart/ShopCart';
import ProductPopOver from '../ProductPopOver/ProductPopOver';

import './Products.css';

import _ from 'lodash';
export default class Products extends React.Component {

  constructor(props){
    super(props);

    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.displayCart = this.displayCart.bind(this);
    this.displayProductPopOver = this.displayProductPopOver.bind(this);

    this.state = {
      cart: {},
      cartTotalItems: 0,
      showCart: true,
      waitingPopOver: 0,
      showProductPopOver: null,
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
    var {products, cart, cartTotalItems, showCart, showProductPopOver} = this.state;
    return (
      <Grid className='Products'>
        <div className={showCart? 'hidden' : 'mask'} onClick={this.displayCart}></div>
        <Row className='shopCartHeader '>
          <Col xs={12} className="text-center offers">
            <div className="text-center">
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
            </div>
            <div className="text-right">
              <Button className="cartButton maskTop" bsSize="sm" onClick={this.displayCart}>
                <Glyphicon glyph="shopping-cart" /> ({cartTotalItems})
              </Button>
              {showProductPopOver? <ProductPopOver product={showProductPopOver} /> : null}
            </div>
          </Col>

        </Row>
        <Row>
          {_.map(products, function(product, index){
            return(
              <Col sm={3}>
                <Thumbnail className='product text-center' src={product.image}  key={index}>
                  <h4> $ {product.price}</h4>
                  <h6>{product.name} </h6> <br/>

                    <div className='buttons'>
                     {cart[product.code]?
                          <div className='addbutton'>
                            <Glyphicon glyph="minus-sign" className='deleteProductButton' onClick={()=> this.removeFromCart(product)} />

                            {cart[product.code].quantity}
                          </div>
                        : '  '}
                        <div className='addbuttons'>
                          <Glyphicon glyph="plus-sign" className='addProductButton' onClick={() => this.addToCart(product)}/>
                        </div>
                    </div>
                </Thumbnail>
              </Col>
            );
          }.bind(this))}
          <div className={showCart? 'hidden' : ''} >
            <ShopCart cart={cart}
                    addToCart={this.addToCart}
                    removeFromCart={this.removeFromCart} />
          </div>
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
    cart[product.code] = product;

    var waitingPopOver = _.cloneDeep(this.state.waitingPopOver);

    this.setState({cart: cart, cartTotalItems: cartTotalItems, showProductPopOver: product, waitingPopOver: ++waitingPopOver});
    this.displayProductPopOver(product);
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

  displayProductPopOver(product){
    setTimeout( function() {
      var waitingPopOver = _.cloneDeep(this.state.waitingPopOver);
      if(waitingPopOver > 1){
        this.setState({waitingPopOver: --waitingPopOver});
      }
      else {
        this.setState({showProductPopOver: null, waitingPopOver: 0});
      }
    }.bind(this),3000);
  }

  displayCart(){
    this.setState({showCart: !this.state.showCart});

    if(this.state.showCart){
      document.getElementById('body').style.overflow = "hidden";
    }
    else{
      document.getElementById('body').style.overflow = "auto";
    }
  }
}
