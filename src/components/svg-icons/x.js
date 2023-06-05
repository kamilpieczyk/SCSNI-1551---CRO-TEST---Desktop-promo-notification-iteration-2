import { h, Fragment } from 'preact'
import './style.scss'

/** @jsx h */

const XIcon = (props) => (
  <Fragment>
    <div className="dy-close-btn" {...props}>
      <div />
      <div />
    </div>

    <div className="dy-close-btn-animated" {...props}>
      <div />
      <div />
    </div>
  </Fragment>
);

export default XIcon;