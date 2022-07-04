import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from '../NavigationItem/NavigationItem';

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/">Burger Builder</NavigationItem>
    {props.isAuthenticated ? <NavigationItem link="/Orders">Orders</NavigationItem> : null}
    {!props.isAuthenticated ? (
      <NavigationItem link="/Auth">Account</NavigationItem>
    ) : (
        <NavigationItem link="/Logout">Logout</NavigationItem>
      )}
  </ul>
);

export default navigationItems;
