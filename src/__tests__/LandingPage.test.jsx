import React from 'react';
import { render, screen } from '@testing-library/react';
import Landing from '../pages/LandingPage/LandingPage';

test('LandingPage renders Header, Success, Features, Categories, Testimonials, FAQ', () => {
  render(<Landing />);

  expect(screen.getByText(/skillwave/i)).toBeInTheDocument(); // Header
  expect(screen.getByText(/achievements/i)).toBeInTheDocument(); // Success section
  expect(screen.getByText(/features/i)).toBeInTheDocument(); // Features section
  expect(screen.getByText(/categories/i)).toBeInTheDocument(); // Categories section
  expect(screen.getByRole('heading', { name: /testimonials/i })).toBeInTheDocument();
  expect(screen.getByText(/faq/i)).toBeInTheDocument(); // FAQ section
});
