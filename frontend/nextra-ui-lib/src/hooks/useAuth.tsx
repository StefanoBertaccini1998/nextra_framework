import { useCallback, useEffect, useState } from 'react';
import { api, setToken as setApiToken } from '../services/api';

type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
};

const STORAGE_KEY = 'ui_lib_jwt';

export function useAuth({ authPath = '/auth/login' } = {}) {
  const [state, setState] = useState<AuthState>(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    const token = stored || null;
    if (token) setApiToken(token);
    return { token, isAuthenticated: !!token };
  });

  useEffect(() => {
    if (state.token) localStorage.setItem(STORAGE_KEY, state.token);
    else localStorage.removeItem(STORAGE_KEY);
    setApiToken(state.token);
  }, [state.token]);

  const login = useCallback(async (credentials: { username?: string; email?: string; password: string }) => {
    // Server wraps responses in ApiResponse<T> { success, message, data }
    const res = await api.post<any>(authPath, credentials);

    // Support both shapes: { token } or { success, data: { token } }
    const token = res?.token ?? res?.data?.token ?? res?.data?.accessToken ?? null;

    if (token) {
      setState({ token, isAuthenticated: true });
      return { token };
    }

    throw new Error('Invalid login response');
  }, [authPath]);

  const logout = useCallback(() => {
    setState({ token: null, isAuthenticated: false });
  }, []);

  return {
    ...state,
    login,
    logout,
    setToken: (t: string | null) => setState({ token: t, isAuthenticated: !!t }),
  } as const;
}

export default useAuth;
