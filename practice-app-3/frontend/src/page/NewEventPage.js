import React from 'react';
import EventForm from '../components/EventForm';
import { json, redirect } from 'react-router-dom';

function NewEventPage() {
	/* function submitHandler(event) {
    event.preventDefault();
    navigation('')
  } */
	return <EventForm method='post' />;
}

export default NewEventPage;

export async function action({ request, params }) {
	const data = await request.formData();

	const eventData = {
		title: data.get('title'),
		image: data.get('image'),
		date: data.get('date'),
		description: data.get('description'),
	};

	const response = await fetch('http://localhost:8080/events', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(eventData),
	});

	if (response.status === 422) {
		// 백엔드에서 받은 응답을 return
		// 리턴된 action은 loader와 마찬가지로 컴포넌트에서 사용할 수 있다
		return response;
	}

	if (!response.ok) {
		throw json({ message: 'Could not save event' }, { status: 500 });
	}

	return redirect('/events');
}
