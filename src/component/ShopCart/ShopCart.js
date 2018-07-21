import React from 'react';
import '../../shared/shared.css';
import './ShopCart.css';
import _ from 'lodash';

export default class ShopCart extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);

    this.state = {
      cartItems: [
        "CH1": {
          code: "CH1",
          name: "chai",
          quantity: 3,
          price: 3.11,
        }
      ]
    };
  }

  render() {
    return (
     <div className="shopCart">
        ShopCart

        <div className="cartItems">
        </div>

        <div className='total'>
        </div>


     </div>
    );
  }


  onChange (e) {
    this.setState({textToAdd : e.target.value});
  }
}