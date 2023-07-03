import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';

// 라우터의 전환상태를 알 수 있다
// 전환 개시/대기/완료
// root페이지에서 useNavigation을 import한다

function EventsPage() {
  const data = useLoaderData();
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
  const response = await fetch('http://localhost:8080/events');
  // practice-app-3/backend/routes/events.js에서 가져온다
  // 가져오는 시간이 늦어지면 리액트 라우터는 데이터를 가져올 때까지 대기한다
  if (!response.ok) {
    // ...
  } else {
    // const resData = await response.json();
    // return resData.events;

    // new Response('any data', {상세설명})
    // const res = new Response('any data', { status: 200 });

    // fetch로 데이터를 받아오면 자동으로 response가 돌아오는 것이므로
    // 아래와 같이 return해도 된다
    return response;
  }
}
