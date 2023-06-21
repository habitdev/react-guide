# Forward Refs
- 자주 사용하면 안좋다
- `useImperativeHandle`훅을 사용
- 컴포넌트나 컴포넌트 내부에서 오는 기능을 명령적으로 사용할 수 있게 해준다
- `useImperativeHandle`은 반드시 객체를 `return`해야 한다
- 스크롤링이나 폼의 `focus`같은 경우는 예외적으로 사용하는 것이 나을 수 있다