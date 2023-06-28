import { createStore } from 'redux';
import { createSlice } from '@reduxjs/toolkit';

// 🚫 리덕스로 작업할 땐 절대 절대 절대 기존의 state를 변경해선 안된다
// ⭐ 반드시 새로운 객체로 설정하여 반환한다

const initialState = { counter: 0, showCounter: true };
// export const INCREMENT = 'increment';

createSlice({
  name: 'counter',
  initialState: initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      state.counter = state.counter + action.amount;
    },
    toggle(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
// reducers안의 메서드는 자동으로 최근 값을 받는다
// 여기선 기존 상태를 변경할 수 없으므로 위와 같이 작성해도 된다
// 자동으로 state를 복사하기 때문이다

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
