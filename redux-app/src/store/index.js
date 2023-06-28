import { createSlice, configureStore } from '@reduxjs/toolkit';

// 🚫 리덕스로 작업할 땐 절대 절대 절대 기존의 state를 변경해선 안된다
// ⭐ 반드시 새로운 객체로 설정하여 반환한다
// configureStore: 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다

const initialState = { counter: 0, showCounter: true };
// export const INCREMENT = 'increment';

const counterSlice = createSlice({
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
      state.counter = state.counter + action.payload;
      // payload의 이름을 정할 수 없다 무조건 payload
    },
    toggleCounter(state) {
      state.showCounter = !state.showCounter;
    },
  },
});
// reducers안의 메서드는 자동으로 최근 값을 받는다
// 여기선 기존 상태를 변경할 수 없으므로 위와 같이 작성해도 된다
// 자동으로 state를 복사하기 때문이다
/*
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
*/

// counterSlice.actions.toggleCounter
// 액션을 생성해준다
// 이런 객체는 이미 type 프로퍼티를 가지고 있다(자동생성)

// const store = createStore(counterSlice.reducer);
const store = configureStore({
  reducer: counterSlice.reducer,
  // reducer: {
  //   counter: counterSlice.reducer,
  // }
});
// 리듀서가 여러 개이면 리듀서 map을 만들어 사용한다

export const countActions = counterSlice.actions;
export default store;
