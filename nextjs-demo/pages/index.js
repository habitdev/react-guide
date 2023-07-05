import { useEffect, useState } from 'react';
import MeetupList from '../components/meetups/MeetupList';
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

function HomePage(props) {
  return <MeetupList meetups={props.meetups} />;
}

// pages폴더 안에 있는 페이지들만 가능한 특수함수
// 컴포넌트를 호출하기 저에 호출
// 빌드 중에 실행
export async function getStaticProps() {
  // return { props: {} }; //항상 객체를 반환해야 한다 // props는 항상 props여야 한다
  // 이 props가 위의 컴포넌트에서 받아들이는 props가 된다
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
}

export default HomePage;
