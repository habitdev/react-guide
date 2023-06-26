// 커스텀 훅은 반드시 use로 시작되어야 한다
import React, { useState, useEffect } from 'react';

function useCounter(forwards = true) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        setCounter((prevCounter) => prevCounter + 1);
      } else {
        setCounter((prevCounter) => prevCounter - 1);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [forwards]);

  return counter;
}

export default useCounter;
