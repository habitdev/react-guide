import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetails from '../../components/meetups/MeetupDetails';

function MeetupDetail(props) {
  return (
    <MeetupDetails
      image={props.meetupData.image}
      title={props.meetupData.title}
      description={props.meetupData.description}
      address={props.meetupData.address}
    />
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    'mongodb+srv://mgo-react:PQ3IgTHH5IWe91YP@cluster0.eukvctn.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  // 모든 객체를 가져오고 _id만 포함한다
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    'mongodb+srv://mgo-react:PQ3IgTHH5IWe91YP@cluster0.eukvctn.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const selectedMeetup = await meetupsCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  console.log(selectedMeetup);

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
      },
    },
  };
}

export default MeetupDetail;
