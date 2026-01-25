import { render, screen } from '@testing-library/react';
import TrendsList from '../components/TrendsBoard/TrendsList';
import { mockTrendsRepo } from '../mocks/mockTrendsRepo';
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

describe('TrendsList Component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders repository list', () => {
    const pages = [
      {
        repositories: [mockTrendsRepo],
      },
    ];

    render(
      <TrendsList
        pages={pages}
        fetchNextPage={mockFetchNextPage}
        hasNextPage={false}
        isFetchingNextPage={false}
      />,
      { wrapper },
    );

    expect(screen.getByText('awesome-project')).toBeInTheDocument();
  });

  it('displays message when pages are empty', () => {
    render(
      <TrendsList
        pages={[]}
        fetchNextPage={mockFetchNextPage}
        hasNextPage={false}
        isFetchingNextPage={false}
      />,
      { wrapper },
    );

    expect(screen.getByText('No trending repositories available')).toBeInTheDocument();
  });

  it('renders all repositories from multiple pages', () => {
    const pages = [
      {
        repositories: [
          { ...mockTrendsRepo, name: 'repo-1' },
          { ...mockTrendsRepo, name: 'repo-2' },
        ],
      },
      {
        repositories: [{ ...mockTrendsRepo, name: 'repo-3' }],
      },
    ];

    render(
      <TrendsList
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
        repositories: [mockTrendsRepo],
      },
    ];

    render(
      <TrendsList
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
