import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';
import fs from 'fs';


import ShopCart from '../component/ShopCart/ShopCart';
import samples from './data/shopCart.json'

const shopCartWrapper = shallow(<ShopCart />);
const shopCartInstance = shopCartWrapper.instance();

//should be accesible through a json and should be an array

describe('ShopCart component', () => {

  it('should render snapshot ShopCart', () => {
    const component = renderer.create(
      <ShopCart />
    );

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('checks getTotal returns the correct value', function(){
    for(var i = 0; i < samples.length; i++){
      var sample = samples[i];
      expect(shopCartInstance.getTotal(sample.cart)).toBe(sample.total);
    }

  });

});
