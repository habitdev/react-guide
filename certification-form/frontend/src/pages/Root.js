import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import { useEffect } from 'react';

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const submit = useSubmit();
  /*
    useSubmit:  
    - 양식 내에서 값이 변경될 떄마다 양식을 제출할 수 있습니다. 
    - 계획적인 양식 제출
    - 첫번째 인자에는 우리가 제출하려는 데이터를 넣고, 
    - 두 번째 인자에는 우리가 Form에 설정할 수 있는 것과 기본적으로 같은 값들을 설정
  */

  useEffect(() => {
    if (!token) {
      return;
    }

    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, 1 * 60 * 60 * 1000); // 1시간
  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
