import { render, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';
import useDailyRepoQuery from '../queries/useDailyRepoQuery';
import { mockedDestructuredRepository } from './mocks';
import Daily from '../components';

const mockedUseDailyRepoQuery = useDailyRepoQuery as jest.Mock<
  ReturnType<typeof useDailyRepoQuery>
>;

jest.mock('../queries/useDailyRepoQuery');

describe('Daily 섹션은 매일 확인하고 싶은 저장소 정보를 랜더링한다.', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('선정된 데일리 저장소가 없을 때, 저장소 검색창을 통해 선정할 저장소를 검색할 수 있다.', async () => {
    mockedUseDailyRepoQuery.mockImplementation(() => ({
      searchInput: 'gitin',
      onChange: jest.fn(),
      resetDailyRepoState: jest.fn(),
      updateAtomRepoState: jest.fn(),
      tmpDailyRepoState: {
        prevRepo: null,
        updatedAt: '',
        hasTodayContribution: false,
      },
      resetTmpDailyRepoState: jest.fn(),
      isPrivateRepo: false,
      setIsPrivateRepo: jest.fn(),
    }));

    render(
      <RecoilRoot>
        <Daily />
      </RecoilRoot>
    );
    const repoSearchInput = await screen.findByPlaceholderText('Search repository...');

    expect(repoSearchInput).toBeInTheDocument();
    expect((repoSearchInput as HTMLInputElement).value).toBe('gitin');
  });

  it('선정된 데일리 저장소가 있을 때, 데일리 저장소의 정보를 확인할 수 있다.', async () => {
    mockedUseDailyRepoQuery.mockImplementation(() => ({
      searchInput: 'gitin',
      onChange: jest.fn(),
      resetDailyRepoState: jest.fn(),
      updateAtomRepoState: jest.fn(),
      tmpDailyRepoState: {
        prevRepo: mockedDestructuredRepository,
        updatedAt: '',
        hasTodayContribution: false,
      },
      resetTmpDailyRepoState: jest.fn(),
      isPrivateRepo: false,
      setIsPrivateRepo: jest.fn(),
    }));

    render(
      <RecoilRoot>
        <Daily />
      </RecoilRoot>
    );

    const repoName = await screen.findByText('gitin');
    expect(repoName).toBeInTheDocument();
    const latestCommitMessage = await screen.findByText('Update README');
    expect(latestCommitMessage).toBeInTheDocument();
  });
});
