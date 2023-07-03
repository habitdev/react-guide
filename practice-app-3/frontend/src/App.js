// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from './page/HomePage';
import EventsPage, { loader as eventsLoader } from './page/EventsPage';
import EventDetailPage, { loader as eventDetailLoader } from './page/EventDetailPage';
import NewEventPage from './page/NewEventPage';
import EditEventPage from './page/EditEventPage';
import ErrorPage from './page/Error';
import Root from './page/Root';
import EventRoot from './page/EventRoot';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />, // wrapper 역할
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventRoot />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':eventId',
            id: 'event-detail', // eventDetailLoader을 공용으로 사용하면 children의 페이지들에서 찾을 수 가 없으므로(useLoaderData의 상위가 해당 페이지이므로) 특별한 임의의 아이디를 부여해야 한다.
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage /> },
              { path: 'edit', element: <EditEventPage /> },
            ],
          },
          { path: 'new', element: <NewEventPage /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
