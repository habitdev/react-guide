import { createSlice } from '@reduxjs/toolkit';

// 🚫 리덕스로 작업할 땐 절대 절대 절대 기존의 state를 변경해선 안된다
// ⭐ 반드시 새로운 객체로 설정하여 반환한다
// configureStore: 여러 개의 리듀서를 하나의 리듀서로 쉽게 합칠 수 있다

const initialCounterState = { counter: 0, showCounter: true };
// export const INCREMENT = 'increment';

const counterSlice = createSlice({
  name: 'counter',
  initialState: initialCounterState,
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

export const countActions = counterSlice.actions;
export default counterSlice.reducer;
