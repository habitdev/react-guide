import classes from './MealItem.module.css';

import React from 'react';
import MealItemForm from './MealItemForm';

function MealItem(props) {
  const price = `$${props.price.toFixed(2)}`;

  return (
    <li
      key={props.id}
      className={classes.meal}
      >
      <div>
        <h3>{props.name}</h3>
        <div className={classes.description}>{props.desc}</div>
        <div className={classes.price}>{price}</div>
      </div>
      <div>
        <MealItemForm id={props.id} />
      </div>
    </li>
  );
}

export default MealItem;
