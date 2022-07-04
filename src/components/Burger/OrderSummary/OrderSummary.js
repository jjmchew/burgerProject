import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {
  // componentWillUpdate() {
  //   console.log('[OrderSummary] WillUpdate');
  // }

  const labels = ['Salad', 'Mushroom', 'Bacon', 'Cheese', 'Meat'];

  const ingredientSummary = Object.keys(props.ingredients).map((igKey, id) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{labels[id]}</span> :{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button clicked={props.purchaseCancelled} btnType="Danger">
        CANCEL
        </Button>
      <Button clicked={props.purchaseContinued} btnType="Success">
        CONTINUE
        </Button>
    </Aux>
  );
}

export default OrderSummary;
