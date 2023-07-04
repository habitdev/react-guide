import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

// lazy: 리액트에서 제공하는 함수
// Suspense: 다른 컴포넌트를 상요해 실제로 콘텐츠를 렌더링하기 전에
// 콘텐츠 로딩을 기다리는 데 사용
const BlogPage = lazy(() => import('./pages/Blog').then());
const PostPage = lazy(() => import('./pages/Post').then());

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading....</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () => import('./pages/Blog').then((module) => module.loader()),
          },
          {
            path: ':id',
            element: (
              <Suspense fallback={<p>Loading....</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) => import('./pages/Post').then((module) => module.loader(meta)),
            // meta안에는 param이 들어있으므로 {param} 대신 매개변수로 넘겨도 된다
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
