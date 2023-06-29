# 리덕스 및 부작용(및 비동기 코드)

- 어디에 비동기 코드를 넣어야 하나? 
  => 컴포넌트(`useEffect()`)
  => `action creators` 안에 생성

리듀서 안에는 `http()`와 통신하는 코드를 넣을 수 없다

[설명된 블로그..](https://velog.io/@jeong_woo/React.js-%EB%A6%AC%EB%8D%95%EC%8A%A4-%EB%B9%84%EB%8F%99%EA%B8%B0http)