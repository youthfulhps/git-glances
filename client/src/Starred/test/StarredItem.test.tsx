import { render, screen } from '@testing-library/react';
import StarredItem from '../components/StarredBoard/StarredList/StarredItem';
import { mockStarredRepo } from '../mocks/mockStarredRepo';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

describe('StarredItem Component', () => {
  it('renders starred repository information', () => {
    render(<StarredItem repo={mockStarredRepo} />, { wrapper });

    expect(screen.getByText('favorite-framework')).toBeInTheDocument();
    expect(
      screen.getByText('Your favorite JavaScript framework for building modern web applications'),
    ).toBeInTheDocument();
  });

  it('has correct repository link attributes', () => {
    render(<StarredItem repo={mockStarredRepo} />, { wrapper });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/favorite/repo');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('displays star and fork counts', () => {
    render(<StarredItem repo={mockStarredRepo} />, { wrapper });

    expect(screen.getByText('89012')).toBeInTheDocument();
    expect(screen.getByText('2345')).toBeInTheDocument();
  });

  it('displays AI summary generation button', () => {
    render(<StarredItem repo={mockStarredRepo} />, { wrapper });

    expect(screen.getByText('Generate AI Summary')).toBeInTheDocument();
  });
});
