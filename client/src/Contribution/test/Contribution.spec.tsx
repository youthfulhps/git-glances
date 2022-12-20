import { render, screen } from '@testing-library/react';
import Contribution from '../components';
import useContributionQuery from '../queries/useContributionQuery';
import { mockedContributionCollection } from './mocks';

const mockedUseContributionQuery = useContributionQuery as jest.Mock<any>;

jest.mock('../queries/useContributionQuery');

describe('Contribution 컴포넌트는 유저의 오늘 기여도 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseContributionQuery.mockImplementation(() => ({
      contribution: mockedContributionCollection,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유저의 오늘 기여도 정보를 랜더링한다.', async () => {
    render(<Contribution />);
    const contributionCount = await screen.findByText('3');
    expect(contributionCount).toBeInTheDocument();
  });
});
