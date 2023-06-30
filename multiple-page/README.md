# react-router-dom

### 기본 사용법

```js
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // wrapper 역할
    errorElement: <Error />, // 에러 페이지
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
      { path: '/products:id', element: <ProductDetail /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
```

`children`에 있는 `path`는 부모 `path`의 경로를 따라간다(상대경로)
`products/:productId`와 `products/`는 형제이므로
상위로 가도록 이동하면 `/`로 이동하게 된다
=> relative='route' 도 동일
📌relative='path'일 경우는 세그먼트만 제거하게 된다

### 다른 방법1

```js
const routeDef = createRoutesFromElements(
  <Route>
    <Route path='/' element={<Home/>} />
    <Route path='/products' element={<Products/>} />
  </Route>
) */
const router = createBrowserRouter(routeDef)

function App() {
  return <RouterProvider router={router} />;
}
```

## 기능

### 1. Link

- `a`태그 대신에 링크를 받는 컴포넌트 `href`대신에 `to`를 사용한다

### 2. NavLink

- NavLink는 className 속성을 추가할 경우 이는 클래스를 받는 것이 아니라 함수를 받는다
- 그 함수는 앵커 태그에 추가되어야 하는 css 클래스 이름을 추가할 것이다
- {isActive}: `react-router-dom`가 제공한다, boolean
- `end`: url이 to=''안에 있는 글자로 끝나면 true

### 3. useNavigation

프로그램 내부에서 링크를 이동시킬 때 사용한다

```js
const navigate = useNavigate(); // 네비게이션 동작 트리거
function navigateHandler() {
  navigate('/products');
}
<p>
  <button
    type='button'
    onClick={navigateHandler}
  >
    Navigate
  </button>
</p>;
```

### 4. 동적인 url

`:`뒤에 변하는 항목을 입력한다 => `productId`

```js
{ path: '/products/:productId', element: <ProductDetail />  },
```

### 5. useParams

`useParams`은 프로퍼티로 정의한 모든 역동적 경로 세그먼트가 담긴 javascript객체이다

동적으로 만든 세그먼트(`:`)를 식별자로 사용한다
