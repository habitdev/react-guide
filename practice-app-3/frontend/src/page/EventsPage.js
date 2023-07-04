// import { useEffect, useState } from 'react';
import { Await, defer, json, useLoaderData } from 'react-router-dom';

import EventsList from '../components/EventsList';
import { Suspense } from 'react';

// 라우터의 전환상태를 알 수 있다
// 전환 개시/대기/완료
// root페이지에서 useNavigation을 import한다

function EventsPage() {
  const { events } = useLoaderData();

  /* 
    Suspense: 다른 데이터가 도착하길 기다리는 동안에 폴백을 보여주는 특정한 상황에서 사용할 수 있다

    Await: defer가 return하는 Promise객체를 기다림
    fallback: 어떤 기능이 약해지거나 제대로 동작하지 않을 때, 이에 대처하는 기능 또는 동작
  */
  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading</p>}>
      <Await resolve={events}>
        {/* 기다리던 데이터가 오면 실행될 함수 */}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

// 이름은 마음대로 해도 된다
// loader를 사용하는 권장방법은 loader를 불러오는 컴포넌트에 직접 넣는 것이다
// loader는 메뉴를 이동하기 시작할 때 호출된다
// 브라우저에서 실행된다

async function loadEvent() {
  // 브라우저에서 실행되므로 브라우저 API를 사용할 수 있다
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events' };
    // throw new Error();
    // 오류가 생기면 리액트 라우터는 가장 가까운 오류 요소에 접근한다
    //  errorElement: <ErrorPage />,
    /* throw new Response(
      JSON.stringify({ message: 'Could not fetch events' }),
      { status: 500 }
    ); */

    return json({ message: 'Could not fetch events' }, { status: 500 });
    // json 형식의 데이터가 포함된 Response객체를 생성
  } else {
    const resData = await response.json();
    return resData.events;
    // return response;// defer안에선 작동하지 않는다
  }
}

export function loader() {
  // loader가 loadEvent안의 promise의 응답을 기다리지 않게 하기 위해 따로 함수로 만들어 넣는다
  // defer({이 페이지에서 오갈 수 있는 모든 http요청을 넣는다})
  // defer:  페이지가 모두 로드된 후에 해당 외부 스크립트가 실행됨을 명시합니다.
  return defer({
    events: loadEvent(),
  });
}
