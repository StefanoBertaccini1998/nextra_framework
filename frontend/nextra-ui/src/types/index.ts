export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'user';
}

export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
}

export interface MenuItem {
    label: string;
    path: string;
    icon: string;
}