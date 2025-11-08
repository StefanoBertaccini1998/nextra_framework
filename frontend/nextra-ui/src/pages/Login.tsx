import React, { useState } from 'react';
import { Input, Button, useToast } from '../components/common';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Minimal mock auth for MVP
    if (!email || !password) {
      addToast('error', 'Missing fields', 'Please provide email and password');
      return;
    }

  // Mock login success for MVP (replace with real auth call)
  addToast('success', 'Login', 'Logged in (mock)');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-md w-full bg-surface p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <Button type="submit">Sign in</Button>
        </form>
      </div>
    </div>
  );
}
