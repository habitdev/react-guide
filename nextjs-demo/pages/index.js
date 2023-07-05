import MeetupList from '../components/meetups/MeetupList';

function HomePage() {
  const DUMMY_MEETUPS = [
    {
      id: 'm1',
      title: 'meetup 111',
      image:
        'https://velog.velcdn.com/images/shinychan95/post/25fe1724-685d-423a-a838-8855a3453939/NodejsReact.jpg',
      address: 'some address 12345',
      description: 'first meetup!',
    },
    {
      id: 'm2',
      title: 'meetup 222',
      image:
        'https://velog.velcdn.com/images/shinychan95/post/25fe1724-685d-423a-a838-8855a3453939/NodejsReact.jpg',
      address: 'some address 12345',
      description: 'second meetup!',
    },
  ];

  return <MeetupList meetups={DUMMY_MEETUPS} />;
}

export default HomePage;
