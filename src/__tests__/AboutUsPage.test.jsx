import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUsPage from '../pages/aboutUs/AboutUsPage';

test('AboutUsPage renders all main sections', () => {
  render(<AboutUsPage />);
  
  expect(screen.getAllByText(/mission/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/team/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/achievements/i)).toBeInTheDocument();

  const testimonialEl = screen.queryByText((content) =>
    content.toLowerCase().includes('testimonial')
  );
  expect(testimonialEl).not.toBeNull(); // Debug-friendly
  expect(testimonialEl).toBeInTheDocument(); // Ensures it's rendered

  expect(screen.getByText(/contact/i)).toBeInTheDocument();
  expect(screen.getByText(/join us/i)).toBeInTheDocument(); // CTA
});
