import React, { useState, useEffect, createContext } from 'react';
import api from '../services/api';
import { IUser } from '../types';

type AuthType = {
  isAuth: boolean;
  userData: IUser;
};

type PropsAuthContext = {
  state: AuthType;
  setState: React.Dispatch<React.SetStateAction<AuthType>>;
};

const DEFAULT_VALUE = {
  state: {
    isAuth: false,
    userData: { username: '', email: '' },
  },
  setState: () => {},
};

const AuthContext = createContext<PropsAuthContext>(DEFAULT_VALUE);

const AuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state);
  let token;
  let userId;

  useEffect(() => {
    (() => {
      token = localStorage.getItem('token');
      userId = localStorage.getItem('@userId');

      if (token) {
        api.get(`users/${userId}`).then((user) => {
          setState({ ...state, isAuth: true, userData: user.data[0] });
        });

        if (token) {
          api.defaults.headers.Authorization = JSON.parse(token);
        }
      }
    })();
  }, [token, userId]);

  return (
    <AuthContext.Provider value={{ state, setState }}>
      {children}
    </AuthContext.Provider>
  );
};

function handleLogoff() {
  localStorage.removeItem('token');
  localStorage.removeItem('@userId');

  delete api.defaults.headers.common['Authorization'];

  window.location.href = '/dashboard';
}

export { AuthContext, AuthProvider, handleLogoff };
