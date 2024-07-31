import {
  Link,
  redirect,
  useNavigate,
  useNavigation,
  useParams,
  useSubmit,
} from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const { state } = useNavigation();
  const submit = useSubmit();
  const params = useParams();

  // ⭐ 리액트 라우터의 loader로 불러왔어도 컴포넌트 안에 넣어두는 게 좋다
  // 기존 정보 받아오기
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { id: params.id }], // detail과 같아서 detail에서 얻은 데이터(캐시)를 가져온다
    // 따라서, edit 안의 내용이 바로 보여진다
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
    staleTime: 10000, // loader와 중복되므로 일정 시간 이후에도 불러오지 못하면 실행하게 한다
  });

  /* const {
    mutate,
  } = useMutation({
    mutationFn: updateEvent,
    onMutate: async (data) => {
      // mutate 호출 즉시, 프로세스 완료 전, 응답 받기 전에 실행
      // console.log(data); // mutate를 통해 들어온 데이터
      const newEvent = data.event;
      await queryClient.cancelQueries({
        // 프로미스를 반환하므로 await를 사용해야 한다
        queryKey: ['events', { id: params.id }],
      });

      // 이전 데이터 저장
      const prevEvent = queryClient.getQueryData(['events', { id: params.id }]);

      // ['events', { id: params.id }]로 활성화된 모든 쿼리를 취소하여
      // 해당 쿼리의 응답 데이터와 캐시에 업데이트한 데이터가 충돌되지 않게 한다
      queryClient.setQueriesData(['events', { id: params.id }], newEvent); // 저장된 캐시 데이터를 newEvent의 정보로 직접 수정
      // queryClient.setQueriesData(['events', { id: params.id }])
      // 수정하려는 쿼리의 키와 해당 쿼리 키에 저장하려는 데이터를 입력
      // 캐시는 수정되도 백엔드의 데이터는 수정되지 않았을 수 있다

      return { prevEvent };
    },
    onError: (error, data, context) => {
      // context: 이전 데이터를 포함한다 (이전 데이터를 받을 수 있게 하려면 onMutate에서 return을 해줘야 한다)
      // console.log(prevEvent);
      // 이전 데이터로 재설정
      queryClient.setQueryData(
        ['events', { id: params.id }],
        context.prevEvent
      );
    },
    onSettled: () => {
      // onMutate가 끝날 때마다 호출
      // 성공/실패 상관X
      // 캐싱된 쿼리를 무효화
      queryClient.invalidateQueries(['events', { id: params.id }]);
    },
  }); */

  // 이렇게 하면 로딩 스피너 없이 페이지에 바로 적용된다

  function handleSubmit(formData) {
    /* mutate({ id: params.id, event: formData });
    navigate('../'); */
    submit(formData, { method: 'PUT' });
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  /* if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  } */
  if (isError) {
    content = (
      <>
        <ErrorBlock
          title='Failed to load event'
          message={
            error.info?.message ||
            'Failed to load event. Please check your inpus and try again later'
          }
        />
        <div className='form-actions'>
          <Link
            to='../'
            className='button'
          >
            Okay
          </Link>
        </div>
      </>
    );
  }

  if (data) {
    content = (
      <EventForm
        inputData={data}
        onSubmit={handleSubmit}
      >
        {state === 'submitting' ? (
          <p>Sending data...</p>
        ) : (
          <>
            <Link
              to='../'
              className='button-text'
            >
              Cancel
            </Link>
            <button
              type='submit'
              className='button'
            >
              Update
            </button>
          </>
        )}
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}

export function loader({ params }) {
  return queryClient.fetchQuery({
    queryKey: ['events', { id: params.id }],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);
  await updateEvent({ id: params.id, event: updatedEventData });
  await queryClient.invalidateQueries(['events']);

  return redirect('../');
}
