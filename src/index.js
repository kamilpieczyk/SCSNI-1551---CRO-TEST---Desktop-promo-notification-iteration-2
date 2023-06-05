import { render, h } from 'preact'

import App from './app'
import LocationController from '@controllers/location.controller'


/** @jsx h */

const container = document.createElement('div');
container.setAttribute('id', 'basket-promotion-notification');

const selector = document.querySelector('.minicart');

const location = new LocationController();

if ( selector && (!location.isBasket && !location.isCheckout) ) {
  selector.parentNode.appendChild(container);
  render(<App />, document.getElementById('basket-promotion-notification'));
}