import { render, screen } from '@testing-library/react';
import { TrendsRepository } from '@shared/apis/repo';
import { RecoilRoot } from 'recoil';
import useTrendsRepoListQuery from '../queries/useTrendsRepoListQuery';
import Trends from '../components';
import { mockedDestructuredTrendsRepoList } from './mocks';

jest.mock('../queries/useTrendsRepoListQuery');

const mockedUseTrendsRepoListQuery = useTrendsRepoListQuery as jest.Mock<TrendsRepository[]>;

describe('Trends 섹션은 트렌드 저장소 리스트 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseTrendsRepoListQuery.mockImplementation(() => mockedDestructuredTrendsRepoList);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('트렌드 저장소의 이름과 링크를 제공한다.', async () => {
    render(
      <RecoilRoot>
        <Trends />
      </RecoilRoot>
    );
    const trendsRepoLink = await screen.findAllByRole('link');
    const trendsRepoNames = await screen.findAllByText('MovieList');

    expect(trendsRepoNames[0]).toBeInTheDocument();
    expect(trendsRepoLink[0]).toHaveAttribute(
      'href',
      'https://github.com/ozcanzaferayan/MovieList'
    );
  });

  it('트렌드 저장소의 포크 횟수와 스타 갯수를 제공한다.', async () => {
    render(
      <RecoilRoot>
        <Trends />
      </RecoilRoot>
    );
    const stargazersCount = await screen.findByText('20');
    const forksCount = await screen.findByText('1');

    expect(stargazersCount).toBeInTheDocument();
    expect(forksCount).toBeInTheDocument();
  });
});
