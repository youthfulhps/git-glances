import { render, screen } from '@testing-library/react';
import { mockedDestructuredRepoList } from './mocks';
import useRepoSuggestedMaintenanceQuery from '../queries/useRepoSuggestedMaintenanceQuery';
import Repository from '../components';

const mockedUseRepoSuggestedMaintenanceQuery =
  useRepoSuggestedMaintenanceQuery as jest.Mock<any>;

jest.mock('../queries/useRepoSuggestedMaintenanceQuery');

describe('Repository 섹션은 유저의 레포지토리 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseRepoSuggestedMaintenanceQuery.mockImplementation(() => ({
      repoSuggestedMaintenance: mockedDestructuredRepoList[0],
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유지보수를 제안하는 레포지토리의 이름과 코멘트를 확인할 수 있다.', async () => {
    render(<Repository />);
    const suggestionComment = await screen.findByText(
      '오늘은 gitin 개선을 추천해요!'
    );
    expect(suggestionComment).toBeInTheDocument();
  });

  it('유지보수를 제안하는 레포지토리의 링크로 바로가는 버튼이 제공된다.', async () => {
    render(<Repository />);
    const repoSuggestedMaintenanceLink = await screen.findByRole('link');
    expect(repoSuggestedMaintenanceLink).toHaveAttribute(
      'href',
      'https://github.com/youthfulhps/gitin'
    );
  });
});
