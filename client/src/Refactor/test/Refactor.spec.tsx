import { render, screen } from '@testing-library/react';
import { mockedDestructuredRepoList } from './mocks';
import useRefactorSuggestedRepoQuery from '../queries/useRefactorSuggestedRepoQuery';
import Repository from '../components';
import { RefactorSuggestedRepoInfo } from '../atoms/types';

const mockedUseRefactorSuggestedRepoQuery =
  useRefactorSuggestedRepoQuery as jest.Mock<RefactorSuggestedRepoInfo>;

jest.mock('../queries/useRefactorSuggestedRepoQuery');

describe('Refactor 섹션은 리팩토링을 제안하는 저장소 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseRefactorSuggestedRepoQuery.mockImplementation(() => ({
      prevRefactorSuggestedRepo: mockedDestructuredRepoList[0],
      updatedAt: '2022-11-29T04:23:26Z',
      hasTodayCommit: false,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('리팩토링을 제안하는 저장소의 이름과 링크를 제공한다.', async () => {
    render(<Repository />);
    const refactorSuggestedRepoName = await screen.findByText('gitin');

    expect(refactorSuggestedRepoName).toBeInTheDocument();
    expect(refactorSuggestedRepoName).toHaveAttribute(
      'href',
      'https://github.com/youthfulhps/gitin'
    );
  });

  it('유지보수를 제안하는 저장소의 최신 커밋 내역과 링크를 제공한다.', async () => {
    render(<Repository />);
    const refactorSuggestedRepoLatestCommit = await screen.findByText('Update README');

    expect(refactorSuggestedRepoLatestCommit).toBeInTheDocument();
    expect(refactorSuggestedRepoLatestCommit).toHaveAttribute(
      'href',
      'https://github.com/youthfulhps/gitin/commit/9027aa0886b38f406f44653de8ff2f43de447777'
    );
  });
});
