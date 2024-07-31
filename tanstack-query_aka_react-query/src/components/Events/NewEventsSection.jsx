import { useQuery } from '@tanstack/react-query';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import EventItem from './EventItem.jsx';
import { fetchEvents } from '../../util/http.js';

export default function NewEventsSection() {
  /* 
  tanstack 쿼리는 http요청을 전송하는 로직이 내장되어 있지 않지만 요청을 관리하는 
  로직을 제공한다 => 요청과 관련된 데이터와 발생 가능한 오류를 추적하는 역할

  - 다른 페이지로 갔다가 오면 다시 정보를 불러온다
  - 캐시를 이용해서 페이지를 보여주고 이전 데이터에서 바뀐 데이터가 있는 지 확인 후 업데이트 한다

  isPending: 여전히 실행 중인지, 응답을 받았는 지 알려주는 것
  isError: 오류가 있는 지 Boolean
  error: 오류에 대한 정보
  refetch: 같은 쿼리 다시 전송
  staleTime: 캐시에 데이터가 있을 때 업데이트된데이터를 가져오기 위한 요청을 자체적으로 전송하기 전에 얼마나 기다릴 지 설정하는 것 (기본값: 0)
  staleTime으로 설정한 시간 안에 다시 요청하면 요청을 전송하지 않는다(ex: 5초 설정 후 5초 안에 새로고침)
  gcTime: 가비지 타임: 데이터와 캐시를 얼마나 보관할지 제어 (기본값: 5분)
  signal: AbortSignal 을 의미 (GET 요청 시 네트워크 요청을 중간에 중단시킬 수 있는 장치)
          - 대용량 fetching 이 있는 경우 또는 Optimistic UI 를 구현할 때처럼 필요한 경우에만 적용하는 것을 권장  
   */
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { max: 3 }],
    queryFn: ({ signal, queryKey }) => fetchEvents({ signal, ...queryKey[1] }),
    // queryFn는 queryKey의 정보도 가져오므로 같은 정보를 제공하는 것보다
    // ...queryKey[1]와 같이 전달할 정보만 queryKey에서 받아와 spread해서 전달한다
    staleTime: 5000,
  });
  let content;

  if (isPending) {
    content = <LoadingIndicator />;
  }

  if (isError) {
    content = (
      <ErrorBlock
        title='An error occurred'
        message={error.info?.message || 'Failed to fetch events'}
      />
    );
  }

  if (data) {
    content = (
      <ul className='events-list'>
        {data.map((event) => (
          <li key={event.id}>
            <EventItem event={event} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section
      className='content-section'
      id='new-events-section'
    >
      <header>
        <h2>Recently added events</h2>
      </header>
      {content}
    </section>
  );
}
