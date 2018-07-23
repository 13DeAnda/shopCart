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

    this.state = {
      discounts: {
        'BOGO': {
          itemCode: "cf1",
          quantity: 1,
          free: "cf1",
          limited: false
        },
        'APPL': {
          itemCode: "cf1",
          minimun: 3,
          price: 4.50,
          limited: false
        },
        'CHMK': {
          itemCode: "cf1",
          quantity: 1,
          free: "mk1",
          limited: 1
        },
        'APOM': {
          itemCode: "om1",
          quantity: 1,
          discount: 'ap1',
          limited: true
        }
      },
      total: 0
    };
  }

  componentWillMount(props){
    console.log("the component received the props", this.props);
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
            <tbody>
              {_.map(cart, function(product, index){
                return (
                  <tr key={index} >
                    <td>{product.code} </td>
                    <td>{product.name}</td>
                    <td> ${product.price}</td>
                    <td>{product.quantity}</td>
                  </tr>
                )
              })}

            </tbody>
          </Table>
        : <div className="text-center"> Cart is empty </div>}
      </Row>
      <Row className='text-right'>
        Total: ${this.state.total}
      </Row>
     </Col>
    );
  }


  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }

  getTotal(){
    console.log("gona try to get the total", this.state.total);
  }
}