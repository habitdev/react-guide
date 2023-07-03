import React from 'react';
import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../components/EventItem';

function EventDetailPage() {
  // const param = useParams();
  // const data = useLoaderData();
  const data = useRouteLoaderData('event-detail');

  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export default EventDetailPage;

// 리액트 훅에는 접근할 수 없고 라우터에서 받아오는 객체를 매개변수로 받는다
export async function loader({ request, params }) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id);
  if (!response.ok) {
    throw json({ message: 'Could not fetch details form selected events' }, { status: 500 });
  } else {
    return response;
  }
}

export async function action({ params, request }) {
  const id = params.eventId;
  const response = await fetch('http://localhost:8080/events/' + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete event' }, { status: 500 });
  }

  return redirect('/events');
}
