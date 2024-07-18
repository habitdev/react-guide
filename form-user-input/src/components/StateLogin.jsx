import { useEffect, useState } from 'react';
import Input from './Input';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';

export default function Login() {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: '',
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false,
  });

  function handleSubmit(event) {
    event.preventDefault();
    // 입력이 없는 경우 유효성 검사 추가 해야함
    console.log(enteredValues);
  }

  function handleInputChange(identifier, value) {
    setEnteredValues((prevValues) => ({
      ...prevValues,
      [identifier]: value,
    }));
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: false,
    }));
  }

  function handleInputBlur(identifier) {
    setDidEdit((prevEdit) => ({
      ...prevEdit,
      [identifier]: true,
    }));
  }

  const emailIsInvalid =
    didEdit.email &&
    !isEmail(enteredValues.email) &&
    isNotEmpty(enteredValues.email);
  const passwordIsInvalid =
    didEdit.password && !hasMinLength(enteredValues.password, 6);

  // function handleEmailChange(event) {
  //   setEnteredEmail(event.target.value);
  // }

  // function handlePasswordChange(event) {
  //   setEnteredPassword(event.target.value);
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          label='Email'
          id='email'
          type='email'
          name='email'
          onChange={(event) => handleInputChange('email', event.target.value)}
          onBlur={(event) => handleInputBlur('email', event.target.value)}
          value={enteredValues.email}
          error={emailIsInvalid && 'Please enter a valid email address.'}
        />

        <Input
          label='Password'
          id='password'
          type='password'
          name='password'
          onChange={(event) =>
            handleInputChange('password', event.target.value)
          }
          onBlur={(event) => handleInputBlur('password', event.target.value)}
          value={enteredValues.password}
          error={passwordIsInvalid && 'Please enter a valid password.'}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat'>Reset</button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}
