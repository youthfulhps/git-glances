import { render, screen } from '@testing-library/react';
import TrendsSummaryItem from '../components/TrendsSummary/TrendsSummaryItem';
import { mockTrendsRepo } from '../mocks/mockTrendsRepo';

describe('TrendsSummaryItem Component', () => {
  it('displays repository name', () => {
    render(<TrendsSummaryItem trendsRepo={mockTrendsRepo} />);

    expect(screen.getByText('awesome-project')).toBeInTheDocument();
  });

  it('displays repository description', () => {
    render(<TrendsSummaryItem trendsRepo={mockTrendsRepo} />);

    expect(
      screen.getByText('An amazing open source project that everyone is talking about'),
    ).toBeInTheDocument();
  });

  it('displays star count', () => {
    render(<TrendsSummaryItem trendsRepo={mockTrendsRepo} />);

    expect(screen.getByText('45678')).toBeInTheDocument();
  });

  it('displays fork count', () => {
    render(<TrendsSummaryItem trendsRepo={mockTrendsRepo} />);

    expect(screen.getByText('1234')).toBeInTheDocument();
  });

  it('displays owner avatar image', () => {
    render(<TrendsSummaryItem trendsRepo={mockTrendsRepo} />);

    const avatar = screen.getByAltText('github');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/9919?v=4');
  });

  it('renders repository without description', () => {
    const repoWithoutDescription = {
      ...mockTrendsRepo,
      description: '',
    };

    render(<TrendsSummaryItem trendsRepo={repoWithoutDescription} />);

    expect(screen.getByText('awesome-project')).toBeInTheDocument();
  });
});
