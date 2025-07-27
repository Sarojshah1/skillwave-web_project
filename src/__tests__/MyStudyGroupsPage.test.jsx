import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// ✅ Mock the hook BEFORE importing the component
jest.mock('@/features/shared_features/my-study-groups/hooks/useUserGroups', () => ({
  useUserGroups: jest.fn(),
}));

// ✅ Import after mocking
import { useUserGroups } from '@/features/shared_features/my-study-groups/hooks/useUserGroups';
import MyStudyGroupsPage from '../features/shared_features/my-study-groups/pages/MyStudyGroupsPage';

describe('MyStudyGroupsPage', () => {
  test('shows loading state', () => {
    // ✅ Return loading state
    useUserGroups.mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null,
    });

    render(
      <MemoryRouter>
        <MyStudyGroupsPage />
      </MemoryRouter>
    );

    // ✅ Check for loading text
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('shows error state', () => {
    // ✅ Return error state
    useUserGroups.mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: { message: 'Failed to load groups' },
    });

    render(
      <MemoryRouter>
        <MyStudyGroupsPage />
      </MemoryRouter>
    );

    // ✅ Check for error message
    expect(screen.getByText(/failed to load groups/i)).toBeInTheDocument();
  });
});
