# context API

프롭(prop)을 통해 많은 컴포넌트를 거쳐 많은 데이터를 전달할 때 문제가 생길 수 있다
따라서, 한 곳에서 state를 관리할 수 있게 해주는 것

- 대부분 context는 객체로 생성한다
- context의 결과로 컴포넌트는 컴포넌트를 포함하는 객체가 된다

`Provider`: 하위의 모든 prop를 저장하고자 한다면 사용
`Consumer`:`Provider`에 저장한 prop을 사용하려면 `Consumer`로 감싼다
