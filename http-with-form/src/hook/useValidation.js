import React, { useState } from 'react';

export function useValidation(defaultValue, validationFn) {
  const [enteredValue, setEnteredValue] = useState(false);

  const [didEdit, setDidEdit] = useState(false);

  const valueIsValid = validationFn();

  function handleInputChange(event) {
    setEnteredValue(event.target.value);
    setDidEdit(false);
  }

  function handleInputBlur() {
    setDidEdit(true);
  }

  return {
    value: enteredValue,
    handleInputChange,
    handleInputBlur,
    hasError: didEdit && !valueIsValid,
  };
}
