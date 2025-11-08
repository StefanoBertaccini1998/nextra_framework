import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      // Validate input
      if (!email || !password) {
        throw new Error('Please fill in all fields');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo credentials check
      if (email === 'demo@example.com' && password === 'demo') {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('user', JSON.stringify({ name: 'John Doe', email }));
        navigate('/dashboard');
      } else {
        throw new Error('Invalid credentials. Use demo@example.com / demo');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-4">
        <div className="bg-surface rounded-lg shadow-lg p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="h-12 w-12 bg-primary rounded-lg flex items-center justify-center text-white text-2xl font-bold mb-4">
              N
            </div>
            <h1 className="text-2xl font-semibold text-text">Welcome to Nextra</h1>
            <p className="text-text-secondary mt-2">Sign in to continue</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
                placeholder="demo@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-text mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
                placeholder="demo"
              />
              <div className="mt-1">
                <a 
                  href="#" 
                  className="text-sm text-primary hover:text-primary/80"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('This is a demo version. Use demo@example.com / demo to sign in.');
                  }}
                >
                  Forgot your password?
                </a>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          {/* Demo Notice */}
          <div className="mt-6 text-sm text-text-secondary text-center space-y-2 border-t border-border pt-6">
            <p className="font-medium">
              Demo Credentials
            </p>
            <p>
              Email: <span className="text-text">demo@example.com</span><br />
              Password: <span className="text-text">demo</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};