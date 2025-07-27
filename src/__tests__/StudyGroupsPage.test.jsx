import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock the hook BEFORE importing the component
jest.mock('@/features/shared_features/study_groups/hooks/useGroupStudy', () => ({
  useGetAllGroups: jest.fn(),
  useJoinGroup: () => ({ mutateAsync: jest.fn() }),
}));

// Import AFTER mocking
import { useGetAllGroups } from '@/features/shared_features/study_groups/hooks/useGroupStudy';
import StudyGroupsPage from '../features/shared_features/study_groups/pages/StudyGroupsPage';

describe('StudyGroupsPage', () => {
  it('shows loading state', () => {
    useGetAllGroups.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <StudyGroupsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    useGetAllGroups.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: { message: 'Failed to load' },
    });

    render(
      <MemoryRouter>
        <StudyGroupsPage />
      </MemoryRouter>
    );

    expect(screen.getByText(/failed to load/i)).toBeInTheDocument();
  });
});
