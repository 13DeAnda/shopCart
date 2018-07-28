import React from 'react';
import {Row, Col} from 'react-bootstrap';
import '../../shared/shared.css';
import './ProductPopOver.css';


export default class ProductPopOver extends React.Component {

  render() {
    var {product} = this.props;
    return (
      <Row className="ProductPopOver text-left fadeOut" >
        <Row className="text-center">
          Added to cart:
        </Row>
        <Row>
          <Col sm={1} className="text"> {product.quantity} </Col>
          <Col sm={2}> <img src={product.image} alt="productImage"/> </Col>
          <Col sm={4} className="text"> {product.name} </Col>
        </Row>
      </Row>
    );
  }
}
