import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Slider from '../../components/UI/Slider/Slider';

import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { checkValidity } from '../../shared/utility';

const Auth = (props) => {
  const [isSignup, setIsSignup] = useState(true);
  const [authForm, setAuthForm] = useState(
    {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email address'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    }
  );

  // Set useEffect dependencies and define appropriate re-direct if not buildingBurger
  const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;

  useEffect(() => {
    if (!buildingBurger && authRedirectPath !== '/') {
      onSetAuthRedirectPath();
    }
  }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath]);

  // manage changes to the login input form (email and password)
  const inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...authForm,
      [controlName]: {
        ...authForm[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, authForm[controlName].validation),
        touched: true
      }
    };
    setAuthForm(updatedControls);
  };

  // manage submit click - passes email, password and whether signup (vs signin)
  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(
      authForm.email.value,
      authForm.password.value,
      isSignup
    );
  };

  // manage toggle select for signin to existing account vs sign-up new account 
  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  // turn login form object into an array to support creation of form display object (below)
  const formElementsArray = [];
  for (let key in authForm) {
    formElementsArray.push({
      id: key,
      config: authForm[key]
    });
  }

  // create login form display object
  let form = formElementsArray.map(formElement => (
    <Input
      key={formElement.id}
      elementtype={formElement.config.elementType}
      elementconfig={formElement.config.elementConfig}
      value={formElement.config.value}
      changed={event => inputChangedHandler(event, formElement.id)}
      invalid={!formElement.config.valid}
      shouldValidate={formElement.config.validation}
      touched={formElement.config.touched}
    />
  ));

  // show spinner if loading
  if (props.loading) {
    form = <Spinner />;
  }

  // display error messages as appropriate
  let errorMessage = null;
  if (props.error) {
    errorMessage = <p>{props.error.message}</p>;
  }

  // define apprporiate re-direct path depending on authentication status
  // (navigated to auth from toolbar link vs from burgerBuilder)
  let authRedirect = null;
  if (props.isAuthenticated) {
    authRedirect = <Redirect to={props.authRedirectPath} />;
  }

  return (
    <div className={classes.Auth}>
      <h3>myBurger Account</h3>
      <Slider
        textL='Login to my existing account'
        textR='Create a new account'
        startL={false}
        clickProps={switchAuthModeHandler}
      />
      {errorMessage}
      {authRedirect}
      <form onSubmit={submitHandler}>
        {form}
        <Button btnType="Success">SUBMIT </Button>
      </form>
    </div>
  );
}


const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
