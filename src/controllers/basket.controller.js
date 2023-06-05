import Controller from '@controllers/controller';

class BasketController extends Controller {
  #items = null;
  #bestSaveItem = null;

  constructor() {
    super();
    const $this = this;
  }

  getItems() {
    return this.#items;
  }

  /**
   * 
   * @returns {{ name: String, image: String, alt: String, save: Number }}
   */
  getBestSaveItem() {
    return this.#bestSaveItem;
  }

  async fetchItems() {
    const endpoint = "/on/demandware.store/Sites-SFRA_SCS-Site/en_GB/Cart-Get";
    const data = await this.getRequestHandler(endpoint);

    this.#items = data.items;
    this.#setBestSaveItem();
  }

  #setBestSaveItem() {
    const bestSaveItem = {
      name: "",
      image: "",
      alt: "",
      save: 0
    }

    this.#items.forEach((item) => {
      console.log(item)
      if (item.price && item.price.savings) {
        if (item.price.savings.value) {
          if (bestSaveItem.save === 0) {
            bestSaveItem.name = item.productName;
            bestSaveItem.image = item.images.small[0].urlOriginal;
            bestSaveItem.alt = item.images.small[0].alt;
            bestSaveItem.save = item.price.savings.value;
          }
          else if (item.price.savings.value > bestSaveItem.save) {
            bestSaveItem.name = item.productName;
            bestSaveItem.image = item.images.small[0].urlOriginal;
            bestSaveItem.alt = item.images.small[0].alt;
            bestSaveItem.save = item.price.savings.value;
          }
        }
      }
    });

    this.#bestSaveItem = bestSaveItem;
  }

  createSessionFlag() {
    window.sessionStorage.setItem('basket-promotion-notification-displayed', 'true');
  }
  
  checkSessionFlag() {
    const sessionFlag = window.sessionStorage.getItem('basket-promotion-notification-displayed');
    return sessionFlag ? true : false;
  }
}

export default BasketController;