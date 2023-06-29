import { createSlice, configureStore } from '@reduxjs/toolkit';

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

const initialAuthState = {
  isAuth: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialAuthState,
  reducers: {
    login(state) {
      state.isAuth = true;
    },
    logout(state) {
      state.isAuth = false;
    },
  },
});

// const store = createStore(counterSlice.reducer);
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
  },
});
// 리듀서가 여러 개이면 리듀서 map을 만들어 사용한다

export const countActions = counterSlice.actions;
export const authActions = authSlice.actions;

export default store;
