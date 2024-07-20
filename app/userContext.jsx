// UserContext.js
import React, { createContext, useContext, useState } from 'react';

// 사용자 정보 타입 정의
const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // 초기값은 null로 설정

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
