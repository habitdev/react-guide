import { useEffect, useState } from 'react';
import { MongoClient } from 'mongodb';

import MeetupList from '../components/meetups/MeetupList';

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// pages폴더 안에 있는 페이지들만 가능한 특수함수
// 컴포넌트를 호출하기 저에 호출
// 빌드 중에 실행
export async function getStaticProps() {
  // return { props: {} }; //항상 객체를 반환해야 한다 // props는 항상 props여야 한다
  // 이 props가 위의 컴포넌트에서 받아들이는 props가 된다
  const client = await MongoClient.connect(
    'mongodb+srv://mgo-react:PQ3IgTHH5IWe91YP@cluster0.eukvctn.mongodb.net/?retryWrites=true&w=majority'
  );
  const db = client.db();
  const meetupsCollection = db.collection('meetups');

  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
    // 점진적 정적 생성
    // 이 페이지에 요청이 오면 10초마다 서버에서 페이지를 다시 생성한다
  };
}

// 빌드 중에는 실행되지 않는다
// 배열 다음에 서버에서 실행된다
// 요청이 들어올 때 마다 실행
/*
export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;

  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}
*/
export default HomePage;
