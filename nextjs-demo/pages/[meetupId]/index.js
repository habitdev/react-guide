import MeetupDetails from '../../components/meetups/MeetupDetails';

function MeetupDetail() {
  return (
    <MeetupDetails
      image='https://velog.velcdn.com/images/shinychan95/post/25fe1724-685d-423a-a838-8855a3453939/NodejsReact.jpg'
      title='title 111'
      description='description 111'
      address='address 111'
    />
  );
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: 'm1',
        },
      },
      {
        params: {
          meetupId: 'm2',
        },
      },
    ],
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params;

  console.log(meetupId);

  return {
    props: {
      meetupData: {
        image:
          'https://velog.velcdn.com/images/shinychan95/post/25fe1724-685d-423a-a838-8855a3453939/NodejsReact.jpg',
        title: 'title 111',
        description: 'description 111',
        address: 'address 111',
      },
    },
  };
}

export default MeetupDetail;
