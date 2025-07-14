import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useBlogs } from '../features/shared_features/blogs/hooks/useBlogs';
import BlogPage from '../features/shared_features/blogs/page/BlogPage';

jest.mock('../features/shared_features/blogs/hooks/useBlogs', () => ({
  useBlogs: jest.fn(),
}));

describe('BlogPage', () => {
  test('shows loading spinner', () => {
    useBlogs.mockImplementation(() => ({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    }));

    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows error message', () => {
    useBlogs.mockImplementation(() => ({
      data: [],
      isLoading: false,
      isError: true,
      error: { message: 'Failed to fetch blogs' },
    }));

    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/failed to fetch blogs/i)).toBeInTheDocument();
  });

  test('shows blog data', () => {
    useBlogs.mockImplementation(() => ({
  data: [
    { id: '1', title: 'First Blog', tags: ['React', 'Testing'] },
    { id: '2', title: 'Second Blog', tags: ['Node', 'Express'] },
  ],
  isLoading: false,
  isError: false,
  error: null,
}));


    render(
      <MemoryRouter>
        <BlogPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/first blog/i)).toBeInTheDocument();
    expect(screen.getByText(/second blog/i)).toBeInTheDocument();
  });
});
