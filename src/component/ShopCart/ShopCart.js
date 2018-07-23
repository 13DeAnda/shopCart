import React from 'react';
import '../../shared/shared.css';
import './ShopCart.css';

import {Col, Row, Table} from 'react-bootstrap';
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
  componentWillMount(props){
    this.getTotal();
  }
  render() {
    var {cart} = this.props;
    return (
     <Col sm={3} className="shopCart">
      <Row>
        {Object.keys(cart).length > 0?
          <Table striped  hover>
            <thead>
              <tr>
                <th>Code</th>
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
                      <td>{product.quantity}</td>
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
              })}


          </Table>
        : <div className="text-center"> Cart is empty </div>}
      </Row>
      <Row className='text-right'>
        Total: ${this.state.total}
      </Row>
     </Col>
    );
  }

  //logic
  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

  getDiscounts(){
    _.map(this.state.discounts, function(discount, key){
      var itemNeeded = this.props.cart[discount.itemCode];
      var itemDiscounted = this.props.cart[discount.applied]

      if( itemNeeded && itemDiscounted && discount.quantityRequired <= itemDiscounted.quantity){

        var discounts = this.props.cart[discount.applied].discounts? this.props.cart[discount.applied].discounts : [];
        var price = 0;
        var quantity = 0;


        if(discount.type === 'bogo' || discount.type === 'free'){
          price = -itemDiscounted.price;
          quantity = Math.floor(itemDiscounted.quantity/discount.quantityRequired);
        }
        else if(discount.type === 'reduced'){
          quantity = discount.quantityRequired;
          price = -(itemNeeded.price - discount.newPrice);
        }
        else if(discount.type === 'percentage'){
          price = -(itemDiscounted.price/100 * discount.newPrice);
          quantity = itemDiscounted.quantity > itemNeeded.quantity? itemNeeded.quantity : itemDiscounted.quantity;
        }

        quantity = discount.limit && (quantity < discount.limit)? discount.limit : quantity;

        for(var i = 0; i < quantity; i++){
          discounts.push({discount: key, price: price});
        }

        this.props.cart[discount.applied].discounts = discounts;
      }
    }.bind(this));
  }

  getTotal(){
    var total = 0;

    this.getDiscounts();

    _.map(this.props.cart, function(item, index){
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