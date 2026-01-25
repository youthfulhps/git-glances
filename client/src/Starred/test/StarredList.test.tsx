import { render, screen } from '@testing-library/react';
import StarredList from '../components/StarredBoard/StarredList';
import { mockStarredRepo } from '../mocks/mockStarredRepo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const mockFetchNextPage = jest.fn();

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

const wrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

describe('StarredList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders starred repository list', () => {
    const pages = [
      {
        repositories: [mockStarredRepo],
      },
    ];

    render(
      <StarredList
        pages={pages}
        fetchNextPage={mockFetchNextPage}
        hasNextPage={false}
        isFetchingNextPage={false}
      />,
      { wrapper },
    );

    expect(screen.getByText('favorite-framework')).toBeInTheDocument();
  });

  it('displays empty state when no starred repositories', () => {
    render(
      <StarredList
        pages={[]}
        fetchNextPage={mockFetchNextPage}
        hasNextPage={false}
        isFetchingNextPage={false}
      />,
      { wrapper },
    );

    expect(screen.getByText('No starred repositories')).toBeInTheDocument();
    expect(screen.getByText('Star repositories on GitHub to see them here.')).toBeInTheDocument();
  });

  it('renders all repositories from multiple pages', () => {
    const pages = [
      {
        repositories: [
          { ...mockStarredRepo, name: 'repo-1' },
          { ...mockStarredRepo, name: 'repo-2' },
        ],
      },
      {
        repositories: [{ ...mockStarredRepo, name: 'repo-3' }],
      },
    ];

    render(
      <StarredList
        pages={pages}
        fetchNextPage={mockFetchNextPage}
        hasNextPage={false}
        isFetchingNextPage={false}
      />,
      { wrapper },
    );

    expect(screen.getByText('repo-1')).toBeInTheDocument();
    expect(screen.getByText('repo-2')).toBeInTheDocument();
    expect(screen.getByText('repo-3')).toBeInTheDocument();
  });

  it('displays loading indicator when next page is available', () => {
    const pages = [
      {
        repositories: [mockStarredRepo],
      },
    ];

    render(
      <StarredList
        pages={pages}
        fetchNextPage={mockFetchNextPage}
        hasNextPage={true}
        isFetchingNextPage={true}
      />,
      { wrapper },
    );

    expect(screen.getByText('Loading more...')).toBeInTheDocument();
  });
});
