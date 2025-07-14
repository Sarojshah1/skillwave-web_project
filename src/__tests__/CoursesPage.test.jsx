import React from 'react';
import { render, screen } from '@testing-library/react';

// 👇 Mock the hook at the top for default test
jest.mock('../features/shared_features/courses/hooks/useCourses', () => ({
  useCourses: () => ({
    data: null,
    isLoading: true,
    isError: false,
    error: null,
  }),
}));

import CoursesPage from '../features/shared_features/courses/pages/course-page';

test('CoursesPage shows loading state', () => {
  render(<CoursesPage />);
  expect(screen.getByText(/loading courses/i)).toBeInTheDocument();
});

// ✅ Move this error-state test into a separate file to avoid isolateModules issues
// OR reset the modules properly:

test('CoursesPage shows error state', async () => {
  // Clear the require cache
  jest.resetModules();

  // Temporarily override the mock
  jest.doMock('../features/shared_features/courses/hooks/useCourses', () => ({
    useCourses: () => ({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: 'Failed to load' },
    }),
  }));

  // Re-require the component after the mock is applied
  const { default: CoursesPageWithError } = await import(
    '../features/shared_features/courses/pages/course-page'
  );

  render(<CoursesPageWithError />);
  expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
});
