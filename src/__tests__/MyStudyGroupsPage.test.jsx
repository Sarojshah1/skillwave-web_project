import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('MyStudyGroupsPage shows loading state', () => {
  jest.isolateModules(() => {
    jest.doMock('@/features/shared_features/my-study-groups/hooks/useUserGroups', () => ({
      useUserGroups: () => ({ data: [], isLoading: true, isError: false, error: null }),
    }));
    const MyStudyGroupsPage = require('../features/shared_features/my-study-groups/pages/MyStudyGroupsPage').default;
    render(
      <MemoryRouter>
        <MyStudyGroupsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

test('MyStudyGroupsPage shows error state', () => {
  jest.isolateModules(() => {
    jest.doMock('@/features/shared_features/my-study-groups/hooks/useUserGroups', () => ({
      useUserGroups: () => ({ data: [], isLoading: false, isError: true, error: { message: 'Failed to load groups' } }),
    }));
    const MyStudyGroupsPage = require('../features/shared_features/my-study-groups/pages/MyStudyGroupsPage').default;
    render(
      <MemoryRouter>
        <MyStudyGroupsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/failed to load groups/i)).toBeInTheDocument();
  });
}); 