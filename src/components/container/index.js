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

    let name = item.name

    if ( name.split(' ').length > 5 ) {
      name = item.name.split(' ');
      name = name.slice(0, 5);
      name[name.length-1] = name[name.length-1]+'...'
      name = name.join(' ');
    }
    
    item.name = name;

    setItem(item);

    if (!sessionFlag && item.name) {
      setShow(true);
      handleCloseAfter10seconds();
      basket.createSessionFlag();
    }
  }, []);

  // handle sticky
  useEffect(() => {
    const container = document.getElementById('basket-promotion-notification')
    const contentBox = document.querySelector('.basket-notification-container')

    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        container.style.setProperty('position', 'fixed', 'important')
        contentBox.classList.add('basket-notification-container---animate')
      }
      else {
        container.style.removeProperty('position')
        contentBox.classList.remove('basket-notification-container---animate')
      }
    })
  }, [])

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
            <a href={ item.link } title={ item.link }>{ item.name }</a>
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