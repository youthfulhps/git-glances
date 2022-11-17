import { render, screen } from '@testing-library/react';
import Language from '../components';
import useLanguageListQuery from '../queries/useLanguageListQuery';
import { mockedMergedLanguageList } from './mocks';

const mockedUseLanguageListQuery = useLanguageListQuery as jest.Mock<any>;

jest.mock('../queries/useLanguageListQuery');

describe('Language 컴포넌트는 유저의 언어 사용량 정보를 랜더링한다.', () => {
  beforeEach(() => {
    mockedUseLanguageListQuery.mockImplementation(() => ({
      languageList: mockedMergedLanguageList,
      mostUsedLanguage: {
        name: 'Javascript',
        lines: 1234,
      },
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('유저가 가장 많이 사용한 언어의 정보를 랜더링한다.', async () => {
    render(<Language />);
    const languageName = await screen.findByText('Javascript');
    expect(languageName).toBeInTheDocument();
    const languageLines = await screen.findByText('1234 lines');
    expect(languageLines).toBeInTheDocument();
  });

  it('유저가 가장 많이 사용한 언어의 대표 색상이 배경색으로 설정된다.', async () => {
    render(<Language />);
    const languageSection = await screen.findByTestId('language');
    expect(languageSection).toHaveStyle(
      'background: linear-gradient(45deg, #18181b, #f1e05a)'
    );
  });
});
