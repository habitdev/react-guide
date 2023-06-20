# Reducer

## Side Effects

- 애플리케이션에서 일어나는 다른 모든 것(렌더링을 제외한 모든 것)
- 사이드 이펙트는 컴포넌트에 들어가면 안된다. 버그나 무한 루프가 발생할 가능성이 높기 때문이다.
  => useEffect를 사용

- 종류)
- http 리퀘스트
- 키 입력을 듣고 입력된 데이터 저장
- 그에 대한 응답으로 다른 액션을 실행하는 것

```js
useEffect(()=> {...}, [ dependencies ])
```

- 첫번째 인수는 함수로, 지정된 의존성이 변경된 경우에 모든 컴포넌트 평가 후 실행되어야 하는 함수이다
- 의존성은 두번째 인수에 넣는다
- 리액트가 리렌더링될 때 실행되는 것이 아닌 의존성이 변경될 때마다 첫번째 함수가 다시 실행된다
- `useEffect(()=> {...})`와 같이 의존성을 입력하지 않으면 리액트가 렌더링 될 때마다 실행된다
- `useEffect(()=> {...}, [])`와 같이 입력한다면 처음 렌더링 시에만 실행된다
- cleanUp 함수는 반드시 함수로 return되어야 한다
- cleanUp 함수는 처음 렌더링 시엔 실행되지 않고 두번째부터 실행된다

  ```js
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('setFormIsValid');
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
    }, 500);

    return () => { // cleanUp 함수
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);
  ```
