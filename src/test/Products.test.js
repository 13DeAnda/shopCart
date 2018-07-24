import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';


import Products from '../component/Products/Products';
import samples from './data/shopCart.json'

const productsWrapper = shallow(<Products />);
const productsInstance = productsWrapper.instance();


describe('Products component', () => {

  it('should render snapshot ShopCart', () => {
    const component = renderer.create(
      <Products />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('expects 5 elements displayed', function(){
    expect(productsWrapper.find('.product').length).toEqual(5);
  });

  it('clicks the first element expects the cart length be 1', function(){
    productsWrapper.find('.addProductButton').first().simulate('click');
    expect(Object.keys(productsWrapper.state().cart).length).toEqual(1);
  });

  it('expects total items to be 1', function(){
    expect(productsWrapper.state().cartTotalItems).toEqual(1);
  });

  it('clicks the first element expects the cart length be 1', function(){
    productsWrapper.find('.deleteProductButton').first().simulate('click');
    expect(Object.keys(productsWrapper.state().cart).length).toEqual(0);
  });
});
