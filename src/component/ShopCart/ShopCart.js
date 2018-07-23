import React from 'react';
import '../../shared/shared.css';
import './ShopCart.css';

import {Row, Table, Glyphicon} from 'react-bootstrap';
import _ from 'lodash';

export default class ShopCart extends React.Component {


  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.getDiscounts = this.getDiscounts.bind(this);

    this.state = {
      discounts: {
        'BOGO': {
          itemCode: "CF1",
          quantityRequired: 2,
          applied: "CF1",
          limit: false,
          type: "bogo",
        },
        'CHMK': {
          itemCode: "CH1",
          quantityRequired: 1,
          applied: "MK1",
          limit: 1,
          type: "free",
        },
        'APPL': {
          itemCode: "AP1",
          quantityRequired: 3,
          applied: "AP1",
          limit: false,
          type: "reduced",
          newPrice: 4.50
        },
        'APOM': {
          itemCode: "OM1",
          quantityRequired: 1,
          applied: "AP1",
          limit: false,
          type: "percentage",
          newPrice: 50
        }
      },
      total: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.cart){
      this.setState({cart: _.cloneDeep(nextProps.cart)});
      this.getTotal(nextProps.cart);
    }
  }

  render() {
    var {cart} = this.state;
    return (
     <div  className="shopCart text-right">
      <Row>
        {(cart && Object.keys(cart).length > 0)?
          <Table   hover>
            <thead>
              <tr>
                <th>Code on here</th>
                <th>Item</th>
                <th>Price</th>
                <th>Qty </th>
              </tr>
            </thead>
              {_.map(cart, function(product, index){
                return (
                  <tbody key={index}>
                    <tr >
                      <td>{product.code} </td>
                      <td>{product.name}</td>
                      <td> ${product.price}</td>
                      <td className="text-center">
                        {product.quantity}<br/>
                        <div className="buttons">
                          <Glyphicon glyph="minus-sign" onClick={()=> this.props.removeFromCart(product)} />
                          <Glyphicon glyph="plus-sign" onClick={() => this.props.addToCart(product)}/>
                        </div>

                      </td>
                    </tr>

                    {_.map(product.discounts, function(discount, key){
                      return (
                          <tr key={key} className="discount" >
                            <td> </td>
                            <td>{discount.discount}</td>
                            <td className="price"> ${discount.price}</td>
                            <td></td>
                          </tr>
                      )
                    })}
                  </tbody>
                )
              }.bind(this))}


          </Table>
        : <div className="text-center"> Cart is empty </div>}
      </Row>
      <Row className='text-right'>
        Total: ${this.state.total}
      </Row>
     </div>
    );
  }

  //logic
  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

  getDiscounts(cart){
    if(Object.keys(cart).length < 1){
      return;
    }
    var newCart = _.cloneDeep(cart);
    _.map(this.state.discounts, function(discount, key){
      var itemNeeded = newCart[discount.itemCode];
      var itemDiscounted = newCart[discount.applied];


      if( itemNeeded && itemDiscounted && discount.quantityRequired <= itemDiscounted.quantity){
        //assumes that only one type of discount can be applied to an item
        var discounts = [];
        var price = 0;
        var quantity = 0;

        if(discount.type === 'bogo' || discount.type === 'free'){
          price = -itemDiscounted.price;
          quantity = Math.floor(itemDiscounted.quantity / discount.quantityRequired);
        }
        else if(discount.type === 'reduced'){
          quantity = itemDiscounted.quantity;
          price = -(itemNeeded.price - discount.newPrice);
        }
        else if(discount.type === 'percentage'){
          price = -(itemDiscounted.price/100 * discount.newPrice);
          quantity = itemDiscounted.quantity > itemNeeded.quantity? itemNeeded.quantity : itemDiscounted.quantity;
        }

        quantity = discount.limit && (discount.limit < quantity)? discount.limit : quantity;

        for(var i = 0; i < quantity; i++){
          discounts.push({discount: key, price: price});
        }

        newCart[discount.applied].discounts = discounts;
        this.setState({cart: newCart});

      }
      else if(itemDiscounted && itemDiscounted.discounts
                             && itemDiscounted.discounts.length >0
                             && itemDiscounted.discounts[0].discount === key){
        newCart[discount.applied].discounts = null;
        this.setState({cart: newCart});
      }
    }.bind(this));
  }

  getTotal(cart){
    var total = 0;

    this.getDiscounts(cart);
    _.map(cart, function(item, index){

      total += (item.price*item.quantity);
      if(item.discounts){
        _.map(item.discounts, function(discount){
          total += (discount.price);
        })
      }
    });

    this.setState({total: total.toFixed(2)});
  }


}