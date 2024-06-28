import { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const token = localStorage.getItem('accessToken');

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (token) => {
    localStorage.setItem('accessToken', `bearer ${token}`);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;