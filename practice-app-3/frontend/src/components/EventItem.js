import { Link, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();

  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete', /* action: '/a-diffrent-path'*/ } );
      // submit({}, )
      // {}: 자동으로 form 데이터를 넣는다
      // action: 다른 경로로 설정
    }
  }

  return (
    <article className={classes.event}>
      <img
        src={event.image}
        alt={event.title}
      />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to='edit'>Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
