import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter-store';
import authReducer from './auth-store';

// const store = createStore(counterSlice.reducer);
const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
  },
});
// 리듀서가 여러 개이면 리듀서 map을 만들어 사용한다

export default store;
