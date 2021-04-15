import React, { useState, createContext } from 'react';
import { IUser } from '../types';

type UserType = {
  id: number;
  username: string;
  email: string;
};

type PropsAuthContext = {
  state: UserType;
  setState: React.Dispatch<React.SetStateAction<UserType>>;
};

const DEFAULT_VALUE = {
  state: {
    id: -1,
    username: '',
    email: '',
  },
  setState: () => {},
};

const AuthContext = createContext<PropsAuthContext>(DEFAULT_VALUE);

const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
