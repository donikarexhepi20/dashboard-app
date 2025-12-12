import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { username: string } | null;
  allowDashboardAccess: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  setAllowDashboardAccess: (allow: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('isAuthenticated') === 'true';
  });
  const [user, setUser] = useState<{ username: string } | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [allowDashboardAccess, setAllowDashboardAccess] = useState(() => {
    return localStorage.getItem('allowDashboardAccess') === 'true';
  });

  const login = (username: string, password: string) => {
    // Mock validation
    if (username === 'admin' && password === 'admin123') {
      const userData = { username };
      setIsAuthenticated(true);
      setUser(userData);
      setAllowDashboardAccess(true);
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('allowDashboardAccess', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setAllowDashboardAccess(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    localStorage.removeItem('allowDashboardAccess');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, allowDashboardAccess, login, logout, setAllowDashboardAccess }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};