import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUsPage from '../pages/aboutUs/AboutUsPage';

test('AboutUsPage renders all main sections', () => {
  render(<AboutUsPage />);
  expect(screen.getAllByText(/mission/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/team/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/achievements/i)).toBeInTheDocument();
  expect(screen.getAllByText(/testimonials/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/contact/i)).toBeInTheDocument();
  expect(screen.getByText(/join us/i)).toBeInTheDocument(); // CTA
}); 