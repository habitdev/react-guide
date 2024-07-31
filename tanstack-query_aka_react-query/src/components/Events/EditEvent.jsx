import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  // 기존 정보 받아오기
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', { id: params.id }], // detail과 같아서 detail에서 얻은 데이터(캐시)를 가져온다
    // 따라서, edit 안의 내용이 바로 보여진다
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const {
    mutate,
    // isPending: isPendingUpdating,
    // isError: isErrorUpdating,
    // error: errorUpdating,
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
      // ['events', { id: params.id }]로 활성화된 모든 쿼리를 취소하여
      // 해당 쿼리의 응답 데이터와 캐시에 업데이트한 데이터가 충돌되지 않게 한다
      queryClient.setQueriesData(['events', { id: params.id }], newEvent); // 저장된 캐시 데이터를 newEvent의 정보로 직접 수정
      // queryClient.setQueriesData(['events', { id: params.id }])
      // 수정하려는 쿼리의 키와 해당 쿼리 키에 저장하려는 데이터를 입력
    },
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;
  if (isPending) {
    content = (
      <div className='center'>
        <LoadingIndicator />
      </div>
    );
  }
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
      </EventForm>
    );
  }

  return <Modal onClose={handleClose}>{content}</Modal>;
}
