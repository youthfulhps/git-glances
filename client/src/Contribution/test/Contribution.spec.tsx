import { render, screen } from '@testing-library/react';
import Contribution from '../components';
import useContributionsCollectionQuery from '../queries/useContributionsCollectionQuery';
import { mockedContributionCollection } from './mocks';

const mockedUseContributionQuery =
  useContributionsCollectionQuery as jest.Mock<any>;

jest.mock('../queries/useContributionsCollectionQuery');

describe('Contribution 컴포넌트는 유저의 오늘 기여도 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseContributionQuery.mockImplementation(
      () => mockedContributionCollection
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유저의 총 기여도는 섹션 요약 정보에서 제공한다.', async () => {
    render(<Contribution />);
    const totalContributions = await screen.findByText('3');
    expect(totalContributions).toBeInTheDocument();
  });
});
