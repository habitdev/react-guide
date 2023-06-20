import React, { useState, useRef } from 'react';

import Card from '../UI/Card';
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';
import classes from './AddUser.module.css';
// import Wrapper from '../Helpers/Wrapper';

const AddUser = (props) => {
  // useRef: 리렌더링할 필요없이 value만 바꾸고 싶을 경우 사용
  // useRef은 항상 객체이다, 제어되지 않는 컴포넌트(react로 제어하지 X)
  // state로 했던 방식이 제어되는 컴포넌트 방식(react로 제어하지 O)
  const nameInputRef = useRef();
  const ageInputRef = useRef();

  const [error, setError] = useState();

  const addUserHandler = (event) => {
    event.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredUserAge = ageInputRef.current.value;
    if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter a valid name and age (non-empty values).',
      });
      return;
    }
    if (+enteredUserAge < 1) {
      setError({
        title: 'Invalid age',
        message: 'Please enter a valid age (> 0).',
      });
      return;
    }
    props.onAddUser(enteredName, enteredUserAge);
    nameInputRef.current.value = '';
    ageInputRef.current.value = '';
    // ref를 이용하여 DOM요소를 조작하는 건 매우 드물다
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            ref={nameInputRef}
          />
          <label htmlFor='age'>Age (Years)</label>
          <input
            id='age'
            type='number'
            ref={ageInputRef}
          />
          <Button type='submit'>Add User</Button>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default AddUser;
