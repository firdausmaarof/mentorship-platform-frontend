import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';
import Router, { useRouter } from 'next/router';

import Api from 'lib/api';

const AuthContext = createContext({});

export const ApiAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUserFromCookies() {
      const token = Cookies.get('token');
      if (token) {
        const { data } = await Api.get('/profile');
        if (data) setUser(data);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const {
      data: { auth_token },
    } = await Api.post('/auth/login', {
      email,
      password,
    });

    if (auth_token) {
      Cookies.set('token', auth_token, { expires: 60 });
      const { data } = await Api.get('/profile');
      setUser(data);
    }
  };

  const signup = async (values) => {
    const {
      data: { auth_token },
    } = await Api.post('/signup', values);

    if (auth_token) {
      Cookies.set('token', auth_token, { expires: 60 });
      const { data } = await Api.get('/profile');
      setUser(data);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    Router.push('/');
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export function withAuth(WrappedComponent) {
  const Component = (props) => {
    const { user, isAuthenticated, loading, login, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) Router.push('/mentee/login');
    }, [loading, isAuthenticated]);

    return (
      <WrappedComponent
        {...props}
        user={user}
        logout={logout}
        loading={loading}
      />
    );
  };

  return Component;
}
