import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'

import './style.scss'
import BasketController from "@controllers/basket.controller"

import SaveBadge from '@components/save-badge';
import X from '@components/svg-icons/x';

/** @jsx h */

const Container = () => {
  const [ show, setShow ] = useState(false);
  const [ item, setItem ] = useState({});

  const handleXclick = () => {
    setShow(false);
  }

  const handleCloseAfter10seconds = () => {
    setTimeout(() => setShow(false), 20000);
  }

  const handleNotificationClick = () => {
    window.location.href = 'https://www.scs.co.uk/basket/';
  }

  useEffect(async () => {
    const basket = new BasketController();
    await basket.fetchItems();
    const item =  basket.getBestSaveItem();
    const sessionFlag = basket.checkSessionFlag();

    setItem(item);

    if (!sessionFlag && item.name) {
      setShow(true);
      handleCloseAfter10seconds();
      basket.createSessionFlag();
    }
  }, []);

  return (
    <div 
      className="basket-notification-container"
      style={{
        display: show ? 'block' : 'none'
      }}
    >
      <div className="basket-notification-container__close-icon">
        <X onClick={handleXclick} />
      </div>

      <div>
        <h2>Offer ends soon!</h2>

        <div className="basket-notification-container__content">
          <div className="basket-notification-container__content-left">
            <p>{ item.name }</p>
            <SaveBadge amount={item.save}/>
          </div>
          <div className="basket-notification-container__content-right">
            <img 
              src={item.image} 
              alt={item.alt}
            />
          </div>
        </div>

        <div className="basket-notification-container__view-basket-CTA-box">
          <button onClick={handleNotificationClick}>
            view basket & checkout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Container;