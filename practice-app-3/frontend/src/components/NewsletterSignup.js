import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';
import { useEffect } from 'react';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  /* 
    fetcher.Form을 사용하면 실제로 액션을 트리거 하는데
    하지만 라우터 전환을 시작하지는 않는다
    따라서, fetcher는 액션을 트리거하거나 loader를 트리거하지만
    실제로 그 loader가 속한 페이지 또는 그 액션이 속한 페이지로
    이동하지 않을 때 사용한다 ⭐
  */

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method='post'
      action='/newsletter' // action을 트리거하기 위해 action이 있는 페이지 route를 적는다 그렇지 않으면 오류가 생김..
      className={classes.newsletter}
    >
      <input
        type='email'
        placeholder='Sign up for newsletter...'
        aria-label='Sign up for newsletter'
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;
