import { Component, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { countActions } from '../store/counter-store';
import classes from './Counter.module.css';

// 함수형이 아닌 클래스 컴포넌트의 경우 useSelector/useStore가 아니라
// connect를 사용한다

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const show = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    // dispatch({ type: INCREMENT });
    dispatch(countActions.increment());
  };
  const increaseHandler = () => {
    // dispatch(countActions.increase({ amount: 5 }));
    dispatch(countActions.increase(5));
    // {type: 'ID', payload: }
  };
  const decrementHandler = () => {
    dispatch(countActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(countActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by 5</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

// 클래스 컴포넌트
/*
class Counter extends Component {
  incrementHandler() {
    this.props.increment()
  }
  decrementHandler() {
    this.props.decrement()
  }

  toggleCounterHandler() {}

  render() {
    return (
      <main className={classes.counter}>
        <h1>Redux Counter</h1>
        <div className={classes.value}>{this.props.counter}</div>
        <div>
          <button onClick={this.incrementHandler.bind(this)}>Increment</button>
          <button onClick={this.decrementHandler.bind(this)}>Decrement</button>
        </div>
        <button onClick={this.toggleCounterHandler.bind(this)}>Toggle Counter</button>
      </main>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    counter: state.counter,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    increment: () => dispatch({ type: 'increment' }),
    decrement: () => dispatch({ type: 'decrement' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter); // 클래스 컴포넌트
*/

export default Counter;
