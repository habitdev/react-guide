import React from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

function Root() {
  // const events = useLoaderData();
  // console.log(events); // undefined
  // loader가 path(여기선 events) 아래에 있는 element에서만 사용 가능하기 때문이다

  // 라우터의 전환상태를 알 수 있다
  // 전환 개시/대기/완료
  const navigation = useNavigation();

  return (
    <>
      <MainNavigation />
      <main>
        {navigation === 'loading' && <p>Loading</p>}
        <Outlet />
      </main>
    </>
  );
}

export default Root;
