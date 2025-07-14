import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
jest.mock('../features/shared_features/blogs/hooks/useBlogById', () => ({
  useBlogById: () => ({
    data: null,
    isLoading: true,
    isError: false,
  }),
}));
import BlogDetailPage from '../features/shared_features/blogs/page/BlogDetailPage';

test('BlogDetailPage shows loading state', () => {
  render(
    <MemoryRouter>
      <BlogDetailPage />
    </MemoryRouter>
  );
  expect(screen.getByText(/loading article/i)).toBeInTheDocument();
}); 