import { createStore } from 'redux';
// 🚫 리덕스로 작업할 땐 절대 절대 절대 기존의 state를 변경해선 안된다
// ⭐ 반드시 새로운 객체로 설정하여 반환한다

const initialState = { counter: 0, showCounter: true };
// export const INCREMENT = 'increment';

const counterReducer = (state = initialState, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter,
    };
  }

  if (action.type === 'toggle') {
    return {
      counter: state.counter,
      showCounter: !state.showCounter,
    };
  }

  return state;
};

const store = createStore(counterReducer);

export default store;
