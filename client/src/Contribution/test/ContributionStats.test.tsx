import { render, screen } from '@testing-library/react';
import ContributionStats from '../components/ContributionBoard/ContributionStats';

describe('ContributionStats Component', () => {
  it('displays total commits count', () => {
    render(
      <ContributionStats
        totalCommits={15}
        totalPRs={5}
        totalReviews={3}
        totalIssues={2}
        totalPrivate={1}
      />,
    );

    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('Commits')).toBeInTheDocument();
  });

  it('displays total pull requests count', () => {
    render(
      <ContributionStats
        totalCommits={15}
        totalPRs={5}
        totalReviews={3}
        totalIssues={2}
        totalPrivate={1}
      />,
    );

    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('PRs')).toBeInTheDocument();
  });

  it('displays total reviews count', () => {
    render(
      <ContributionStats
        totalCommits={15}
        totalPRs={5}
        totalReviews={3}
        totalIssues={2}
        totalPrivate={1}
      />,
    );

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();
  });

  it('displays total issues count', () => {
    render(
      <ContributionStats
        totalCommits={15}
        totalPRs={5}
        totalReviews={3}
        totalIssues={2}
        totalPrivate={1}
      />,
    );

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Issues')).toBeInTheDocument();
  });

  it('displays zero values correctly', () => {
    render(
      <ContributionStats
        totalCommits={0}
        totalPRs={0}
        totalReviews={0}
        totalIssues={0}
        totalPrivate={0}
      />,
    );

    const zeros = screen.getAllByText('0');
    expect(zeros.length).toBeGreaterThan(0);
  });
});
