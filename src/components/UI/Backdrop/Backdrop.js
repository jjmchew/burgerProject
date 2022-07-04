import React from 'react';
import classses from './Backdrop.module.css';

const backdrop = props =>
  props.show ? <div className={classses.Backdrop} onClick={props.clicked} /> : null;

export default backdrop;
