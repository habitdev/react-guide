import { useSelector } from 'react-redux';
import classes from './Counter.module.css';

// 함수형이 아닌 클래스 컴포넌트의 경우 useSelector/useStore가 아니라
// connect를 사용한다

const Counter = () => {
  const counter = useSelector((state) => state.counter);

  const toggleCounterHandler = () => {};

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
