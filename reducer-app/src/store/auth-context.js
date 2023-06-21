import React, { useState, useEffect } from 'react';

// Context객체 생성
// AuthContext는 컴포넌트가 아닌 컴포넌트를 감싸는 객체
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {}, // 자동완성 기능을 위한 더미함수
  onLogin: (email, password) => {},
});

export function AuthContextProvider(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoggedInInformation = localStorage.getItem('isLoggedIn');

    if (storedLoggedInInformation === '1') {
      setIsLoggedIn(true);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };
  const loginHandler = () => {
    localStorage.setItem('isLoggedIn', '1');
    setIsLoggedIn(true);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
