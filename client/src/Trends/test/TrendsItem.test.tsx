import { render, screen } from '@testing-library/react';
import TrendsItem from '../components/TrendsBoard/TrendsList/TrendsItem';
import { mockTrendsRepo } from '../mocks/mockTrendsRepo';
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

describe('TrendsItem Component', () => {
  it('renders repository information', () => {
    render(<TrendsItem repo={mockTrendsRepo} />, { wrapper });

    expect(screen.getByText('awesome-project')).toBeInTheDocument();
    expect(
      screen.getByText('An amazing open source project that everyone is talking about'),
    ).toBeInTheDocument();
  });

  it('has correct repository link attributes', () => {
    render(<TrendsItem repo={mockTrendsRepo} />, { wrapper });

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', 'https://github.com/trending/repo');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('displays star and fork counts', () => {
    render(<TrendsItem repo={mockTrendsRepo} />, { wrapper });

    expect(screen.getByText('45678')).toBeInTheDocument();
    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('displays AI summary generation button', () => {
    render(<TrendsItem repo={mockTrendsRepo} />, { wrapper });

    expect(screen.getByText('Generate AI Summary')).toBeInTheDocument();
  });
});
