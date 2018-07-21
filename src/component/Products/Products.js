import React from 'react';
import { Link } from 'react-router-dom';
class Products extends React.Component {

  render() {
    return (
      <div className='Products'>
        <ul>
         <li><Link to="/shop-cart" className='toDoList'>Shop Cart</Link></li>
        </ul>
      </div>
    );
  }
}
export default Products;
