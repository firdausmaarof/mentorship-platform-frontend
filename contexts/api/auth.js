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
        console.log("Got a token in the cookies, let's see if it is valid");
        Api.defaults.headers.Authorization = `${token}`;
        const { data } = await Api.get('api/profile');
        if (data) setUser(data);
      }
      setLoading(false);
    }
    loadUserFromCookies();
  }, []);

  const login = async (email, password) => {
    const {
      data: { auth_token },
    } = await Api.post('api/auth/login', {
      email,
      password,
    });

    if (auth_token) {
      console.log('Got token');
      Cookies.set('token', auth_token, { expires: 60 });
      Api.defaults.headers.Authorization = `${auth_token}`;
      const { data } = await Api.get('api/profile');
      setUser(data);
      console.log('Got user', data);
    }
  };

  const logout = () => {
    Cookies.remove('token');
    setUser(null);
    window.location.pathname = '/';
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: !!user, user, login, loading, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export function withAuth(Component) {
  return () => {
    const { user, isAuthenticated, loading, login, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated && !loading) Router.push('/mentee/login');
    }, [loading, isAuthenticated]);

    return <Component user={user} logout={logout} loading={loading} />;
  };
}
