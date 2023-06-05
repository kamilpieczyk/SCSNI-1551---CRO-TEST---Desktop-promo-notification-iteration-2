import Controller from '@controllers/controller'

class LocationController extends Controller {
  /** 
   @type { String }
   */
  pathname = null;
  /** 
   @type { Boolean }
   */
  isBasket = null;
  /** 
   @type { Boolean }
   */
  isCheckout = null;

  constructor() {
    super();
    this.#fetchPathname();
    this.#checkIfIsBasket();
    this.#checkIfIsCheckout();
  }

  #fetchPathname() {
    const path = window.location.pathname;
    this.pathname = path
  }

  #checkIfIsBasket() {
    this.isBasket = this.pathname === '/basket';
  }

  #checkIfIsCheckout() {
    this.isCheckout = this.pathname === '/checkout/';
  }
}

export default LocationController;