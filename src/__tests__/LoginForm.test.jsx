import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../features/shared_features/auth/components/LoginForm';

// Mock both hooks at top-level
jest.mock('../features/shared_features/auth/hooks/useAuth', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../features/shared_features/auth/hooks/useLoginData', () => ({
  useLoginData: () => ({
    loginData: { email: '', password: '' },
    handleChange: jest.fn(),
  }),
}));

import { useAuth } from '../features/shared_features/auth/hooks/useAuth';

test('LoginForm renders email and password fields', () => {
  useAuth.mockImplementation(() => ({
    loading: false,
    error: null,
    handleLogin: jest.fn(),
  }));

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  expect(screen.getByPlaceholderText(/enter your email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/enter your password/i)).toBeInTheDocument();
});

test('LoginForm shows error message when error is present', () => {
  useAuth.mockImplementation(() => ({
    loading: false,
    error: 'Login failed',
    handleLogin: jest.fn(),
  }));

  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  expect(screen.getByText('Login failed')).toBeInTheDocument();
});
