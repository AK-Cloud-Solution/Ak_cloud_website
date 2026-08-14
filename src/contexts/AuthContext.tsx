import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type UserRole = 'admin' | 'user' | 'visitor';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string, rememberMe: boolean) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('akcloud_demo_user') || sessionStorage.getItem('akcloud_demo_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch { localStorage.removeItem('akcloud_demo_user'); }
    }
  }, []);

  const login = async (username: string, password: string, rememberMe: boolean): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 650));
    if (!username.trim() || !password.trim()) return false;
    const demoUser: User = {
      id: `demo-${Date.now()}`,
      username: username.trim(),
      email: `${username.trim().toLowerCase()}@akcloud.demo`,
      role: username.trim().toLowerCase() === 'admin' ? 'admin' : 'user',
    };
    setUser(demoUser);
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('akcloud_demo_user', JSON.stringify(demoUser));
    return true;
  };

  const register = async (username: string, email: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 750));
    if (!username.trim() || !email.trim() || password.length < 4) return false;
    const demoUser: User = { id: `demo-${Date.now()}`, username: username.trim(), email, role: 'user' };
    setUser(demoUser);
    localStorage.setItem('akcloud_demo_user', JSON.stringify(demoUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('akcloud_demo_user');
    sessionStorage.removeItem('akcloud_demo_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
