import { h } from 'preact'

import './style.scss'

/** @jsx h */

const SaveBadge = ({ amount }) => (
  <div className="basket-notification__save-badge">
    Save £{ amount }
  </div>
)


export default SaveBadge;