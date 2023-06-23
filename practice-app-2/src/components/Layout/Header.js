import React, { Fragment } from 'react';
import classes from './Header.module.css';
import mealsImg from '../../assets/meals.jpg';
import HeaderCartButton from './HeaderCartButton';

function Header(props) {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onCartClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img
          src={mealsImg}
          alt='A table full of food!'
        />
      </div>
    </Fragment>
  );
}

export default Header;
