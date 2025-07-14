import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

test('StudyGroupsPage shows loading state', () => {
  jest.isolateModules(() => {
    jest.doMock('@/features/shared_features/study_groups/hooks/useGroupStudy', () => ({
      useGetAllGroups: () => ({ data: [], isLoading: true, isError: false, error: null }),
      useJoinGroup: () => ({ mutateAsync: jest.fn() }),
    }));
    const StudyGroupsPage = require('../features/shared_features/study_groups/pages/StudyGroupsPage').default;
    render(
      <MemoryRouter>
        <StudyGroupsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});

test('StudyGroupsPage shows error state', () => {
  jest.isolateModules(() => {
    jest.doMock('@/features/shared_features/study_groups/hooks/useGroupStudy', () => ({
      useGetAllGroups: () => ({ data: [], isLoading: false, isError: true, error: { message: 'Failed to load' } }),
      useJoinGroup: () => ({ mutateAsync: jest.fn() }),
    }));
    const StudyGroupsPage = require('../features/shared_features/study_groups/pages/StudyGroupsPage').default;
    render(
      <MemoryRouter>
        <StudyGroupsPage />
      </MemoryRouter>
    );
    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
}); 