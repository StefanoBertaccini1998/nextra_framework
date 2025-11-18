import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DynamicForm, type FormField } from '@nextra/ui-lib';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { login } from '../store/slices/authSlice';
import { useToast } from '../components/common/ToastProvider';

const loginFields: FormField[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'admin',
    required: true,
  },
  {
    name: 'password',
    label: 'Password',
    type: 'text', // Using 'text' for visibility during development
    placeholder: 'password',
    required: true,
  },
];

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { loading, isAuthenticated, error } = useAppSelector((state) => state.auth);
  const [submitted, setSubmitted] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Show error toast
  useEffect(() => {
    if (submitted && error) {
      addToast('error', 'Login Failed', error);
      setSubmitted(false);
    }
  }, [error, submitted, addToast]);

  const handleLogin = async (values: { username: string; password: string }) => {
    setSubmitted(true);
    try {
      await dispatch(login(values)).unwrap();
      addToast('success', 'Login Successful', 'Welcome back!');
      navigate('/dashboard');
    } catch (err: any) {
      // Error will be handled by useEffect
      console.error('Login error:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to Nextra
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Real Estate Management System
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <DynamicForm
            fields={loginFields}
            onSubmit={handleLogin}
            submitLabel="Sign in"
            loading={loading}
            columns={1}
          />
          
          <div className="mt-4 text-center text-sm text-gray-600">
            <p>Default credentials:</p>
            <p className="font-mono text-xs mt-1">
              Username: <strong>admin</strong> / Password: <strong>password</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};