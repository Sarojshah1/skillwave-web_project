import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Signup from '../features/shared_features/auth/pages/signUp';

test('Signup page renders registration form and step navigation', () => {
  render(
    <MemoryRouter>
      <Signup />
    </MemoryRouter>
  );
  expect(screen.getByText(/welcome! let's get started/i)).toBeInTheDocument();
  expect(screen.getByText(/continue/i)).toBeInTheDocument();
}); 