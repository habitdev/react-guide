import { useEffect, useState } from 'react';

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // useEffect를 사용할 경우 true로 설정되면 아무것도 입력하지 않았음에도 http로 전송되므로 잘못되었다
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  useEffect(() => {
    if (enteredNameIsValid) {
      console.log('Name Input is valid!');
    }
  }, [enteredNameIsValid]);

  function nameInputChangeHandler(event) {
    // console.log(event.target.value);
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== '') {
      setEnteredNameIsValid(true);
      return;
    }
  }
  function nameInputBlurHandler(event) {
    setEnteredNameTouched(true);
    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);
      return;
    }
  }
  function formSubmitHandler(event) {
    event.preventDefault();
    setEnteredNameTouched(true);

    if (enteredName.trim() === '') {
      setEnteredNameIsValid(false);

      return;
    }

    console.log(enteredName);
    setEnteredNameIsValid(true);
    setEnteredName('');
    // nameInputRef.current.value = ''
    // 절대로 사용하지 말 것!
  }

  const nameInputInvalid = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses = nameInputInvalid ? 'form-control invalid' : 'form-control';

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
      <div className='form-actions'>
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
