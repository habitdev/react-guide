import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import RootLayout from './pages/Root';

// 다른방법1)
/* 
const routeDef = createRoutesFromElements(
  <Route>
    <Route path='/' element={<Home/>} />
    <Route path='/products' element={<Products/>} />
  </Route>
) */
// const router = createBrowserRouter(routeDef)

// 기본)
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />, // wrapper 역할
    children: [
      { path: '/', element: <Home /> },
      { path: '/products', element: <Products /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
