import { render, screen } from '@testing-library/react';
import App from './App';

describe('App 컴포넌트의 랜더링을 확인한다.', () => {
  beforeAll(() => {
    render(<App />);
  });

  it('App의 제목 컨텐츠를 확인할 수 있다.', async () => {
    const title = await screen.findByText('react boilerplate');
    expect(title).toBeInTheDocument();
  });
});
