import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

// 라우터의 전환상태를 알 수 있다
// 전환 개시/대기/완료
// root페이지에서 useNavigation을 import한다

function EventsPage() {
  const data = useLoaderData();

  if (data.isError) {
    return <p>{data.message}</p>;
  }

  const events = data.events;

  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

// 이름은 마음대로 해도 된다
// loader를 사용하는 권장방법은 loader를 불러오는 컴포넌트에 직접 넣는 것이다
// loader는 메뉴를 이동하기 시작할 때 호출된다
// 브라우저에서 실행된다
export async function loader() {
  // 브라우저에서 실행되므로 브라우저 API를 사용할 수 있다
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events' };
    // throw new Error();
    // 오류가 생기면 리액트 라우터는 가장 가까운 오류 요소에 접근한다
    //  errorElement: <ErrorPage />,
    throw new Response(
      JSON.stringify({ message: 'Could not fetch events' }),
      { status: 500 }
    );
  } else {
    return response;
  }
}
