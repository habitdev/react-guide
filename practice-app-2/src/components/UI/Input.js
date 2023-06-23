import React, { forwardRef } from 'react';
import classes from './Input.module.css';

const Input = forwardRef(function Input(props, ref) {
  return (
    <div className={classes.input}>
      <label htmlFor='{props.input.id}'>{props.label}</label>
      {/* <input type="{props.input.type}" name="" id="{props.input.id}" /> */}
      <input ref={ref} {...props.input} />
    </div>
  );
})

export default Input;
