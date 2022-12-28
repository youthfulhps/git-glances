import { render, screen } from '@testing-library/react';
import Language from '../components';
import useMostUsedLanguageQuery from '../queries/useMostUsedLanguageQuery';

const mockedUseLanguageListQuery = useMostUsedLanguageQuery as jest.Mock<any>;

jest.mock('../queries/useMostUsedLanguageQuery');

describe('Language 컴포넌트는 유저의 언어 사용량 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseLanguageListQuery.mockImplementation(() => ({
      name: 'Javascript',
      lines: 1234,
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유저가 가장 많이 사용한 언어의 정보를 랜더링한다.', async () => {
    render(<Language />);
    const languageName = await screen.findByText('Javascript');
    expect(languageName).toBeInTheDocument();
    const languageLines = await screen.findByText('1234');
    expect(languageLines).toBeInTheDocument();
  });
});
