import React from 'react';
import EventForm from '../components/EventForm.js';
import { useRouteLoaderData } from 'react-router-dom';

function EditEventPage() {
  const data = useRouteLoaderData('event-detail');
  // 공용 loader에서 데이터 받아오기

  return <EventForm method="patch" event={data.event} />;
}

export default EditEventPage;
