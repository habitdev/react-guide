import { useEffect, useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;

  const enteredEmailIsValid = enteredEmail.includes('@');
  const emailInputInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;
  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  function nameInputChangeHandler(event) {
    setEnteredName(event.target.value);
  }

  function nameInputBlurHandler(event) {
    setEnteredNameTouched(true);
  }

  function emailInputChangeHandler(event) {
    setEnteredEmail(event.target.value);
  }

  function emailInputBlurHandler(event) {
    setEnteredEmailTouched(true);
  }

  function formSubmitHandler(event) {
    event.preventDefault();
    setEnteredNameTouched(true);
    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }
    // 폼 제출 후
    setEnteredName('');
    setEnteredEmail('');
    setEnteredNameTouched(false);
    setEnteredEmailTouched(false);
  }

  const nameInputClasses = nameInputInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          value={enteredName}
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
        />
        {nameInputInvalid && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='email'>Your E-mail</label>
        <input
          type='email'
          id='email'
          value={enteredEmail}
          onChange={emailInputChangeHandler}
          onBlur={emailInputBlurHandler}
        />
        {emailInputInvalid && <p className='error-text'>Please enter a valid email</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
