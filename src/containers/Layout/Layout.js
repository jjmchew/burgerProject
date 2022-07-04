import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = (props) => {
  // state = {
  //   showSideDrawer: false
  // };

  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const sideDrawerClosedHandler = () => {
    // this.setState({ showSideDrawer: false });
    setShowSideDrawer(false);
  };

  // const sideDrawerOpenedHandler = () => {
  //   // this.setState({ showSideDrawer: true });
  //   setShowSideDrawer(true);
  // };

  const toggleSideDrawerHandler = () => {
    // var prevState = showSideDrawer;
    // if (prevState === false) {
    //   sideDrawerOpenedHandler();
    // } else {
    //   sideDrawerClosedHandler();
    // }
    setShowSideDrawer(!showSideDrawer);
  };


  return (
    <Aux>
      <Toolbar isAuth={props.isAuthenticated} toggle={toggleSideDrawerHandler} />
      <SideDrawer
        isAuth={props.isAuthenticated}
        show={showSideDrawer}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}> {props.children} </main>
    </Aux>
  );
}


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};
export default connect(mapStateToProps)(Layout);
