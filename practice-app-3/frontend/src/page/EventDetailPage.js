import React from 'react';
import { useParams } from 'react-router-dom';

function EventDetailPage() {
  const param = useParams();

  return (
    <>
      <h1>Event Detail</h1>
      {param.eventId}
    </>
  );
}

export default EventDetailPage;
