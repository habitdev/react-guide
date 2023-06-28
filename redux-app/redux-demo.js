const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
    };
  }
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
    };
  }

  return state
};

// 저장소를 만들 때 counterReducer의 state가 비어 있을 경우  state가 아직 생성되지 않아 오류가 생긴다
// 따라서 counterReducer의 state에 기본 값을 넣어준다
// 저장소 생성 후엔 지금의 state가 설정되므로 기본값은 사용되지 않는다
const store = redux.createStore(counterReducer);

const counterSubscriber = () => {
  const latestState = store.getState(); // 최신 스냅샷 제공
  console.log(latestState);
};

store.subscribe(counterSubscriber); // 데이터와 저장소가 변경될 때 마다 실행
store.dispatch({ type: 'increment' });
// 증가 실행
store.dispatch({ type: 'decrement' });
