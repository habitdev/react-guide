import React from 'react';

// Context객체 생성
// AuthContext는 컴포넌트가 아닌 컴포넌트를 감싸는 객체
const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
