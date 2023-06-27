import { useReducer } from 'react';

const initialInputState = {
  value: '',
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  }
  if (action.type === 'BLUR') {
    return {
      value: state.value,
      isTouched: true,
    };
  }
  if (action.type === 'RESET') {
    return {
      value: '',
      isTouched: false,
    };
  }
  return {
    inputStateReducer,
  };
};

function useInput(validateValue) {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialInputState);
  // const [enteredValue, setEnteredValue] = useState('');
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  function valueChangeHandler(event) {
    dispatch({ type: 'INPUT', value: event.target.value });
  }

  function inputBlurHandler(event) {
    dispatch({ type: 'BLUR' });
  }

  function reset() {
    dispatch({ type: 'RESET' });
  }

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError: hasError,
    valueChangeHandler: valueChangeHandler,
    inputBlurHandler: inputBlurHandler,
    reset: reset,
  };
}

export default useInput;
