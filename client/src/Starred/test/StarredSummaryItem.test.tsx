import { render, screen } from '@testing-library/react';
import StarredSummaryItem from '../components/StarredSummary/StarredSummaryItem';
import { mockStarredRepo } from '../mocks/mockStarredRepo';

describe('StarredSummaryItem Component', () => {
  it('displays repository name', () => {
    render(<StarredSummaryItem starredRepo={mockStarredRepo} />);

    expect(screen.getByText('favorite-framework')).toBeInTheDocument();
  });

  it('displays repository description', () => {
    render(<StarredSummaryItem starredRepo={mockStarredRepo} />);

    expect(
      screen.getByText('Your favorite JavaScript framework for building modern web applications'),
    ).toBeInTheDocument();
  });

  it('displays star count', () => {
    render(<StarredSummaryItem starredRepo={mockStarredRepo} />);

    expect(screen.getByText('89012')).toBeInTheDocument();
  });

  it('displays fork count', () => {
    render(<StarredSummaryItem starredRepo={mockStarredRepo} />);

    expect(screen.getByText('2345')).toBeInTheDocument();
  });

  it('displays owner avatar image', () => {
    render(<StarredSummaryItem starredRepo={mockStarredRepo} />);

    const avatar = screen.getByAltText('framework-team');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/6078720?v=4');
  });

  it('renders repository without description', () => {
    const repoWithoutDescription = {
      ...mockStarredRepo,
      description: '',
    };

    render(<StarredSummaryItem starredRepo={repoWithoutDescription} />);

    expect(screen.getByText('favorite-framework')).toBeInTheDocument();
  });
});
