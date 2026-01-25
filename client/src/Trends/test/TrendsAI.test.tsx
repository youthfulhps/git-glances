import { render, screen, fireEvent } from '@testing-library/react';
import TrendsAI from '../components/TrendsBoard/TrendsList/TrendsItem/TrendsAI';

describe('TrendsAI Component', () => {
  const mockOnGenerate = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays AI summary generation button in initial state', () => {
    render(
      <TrendsAI
        onGenerate={mockOnGenerate}
        isPending={false}
        isError={false}
        data={undefined}
        error={null}
      />,
    );

    expect(screen.getByText('Generate AI Summary')).toBeInTheDocument();
  });

  it('calls onGenerate function when button is clicked', () => {
    render(
      <TrendsAI
        onGenerate={mockOnGenerate}
        isPending={false}
        isError={false}
        data={undefined}
        error={null}
      />,
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockOnGenerate).toHaveBeenCalledTimes(1);
  });

  it('displays loading message when pending', () => {
    render(
      <TrendsAI
        onGenerate={mockOnGenerate}
        isPending={true}
        isError={false}
        data={undefined}
        error={null}
      />,
    );

    expect(screen.getByText('Generating AI summary...')).toBeInTheDocument();
  });

  it('displays error message and retry button when error occurs', () => {
    const error = new Error('API Error');
    render(
      <TrendsAI
        onGenerate={mockOnGenerate}
        isPending={false}
        isError={true}
        data={undefined}
        error={error}
      />,
    );

    expect(screen.getByText('API Error')).toBeInTheDocument();
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });

  it('calls onGenerate when retry button is clicked after error', () => {
    const error = new Error('API Error');
    render(
      <TrendsAI
        onGenerate={mockOnGenerate}
        isPending={false}
        isError={true}
        data={undefined}
        error={error}
      />,
    );

    const retryButton = screen.getByText('Retry');
    fireEvent.click(retryButton);

    expect(mockOnGenerate).toHaveBeenCalledTimes(1);
  });

  it('displays AI summary content when data is available', () => {
    const data = {
      summary: 'This is a great repository for learning React.',
      tags: ['React', 'TypeScript', 'Frontend'],
    };

    render(
      <TrendsAI
        onGenerate={mockOnGenerate}
        isPending={false}
        isError={false}
        data={data}
        error={null}
      />,
    );

    expect(screen.getByText('AI Summary')).toBeInTheDocument();
    expect(screen.getByText('This is a great repository for learning React.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
  });

  it('displays summary data without tags correctly', () => {
    const data = {
      summary: 'This is a simple summary without tags.',
      tags: [],
    };

    render(
      <TrendsAI
        onGenerate={mockOnGenerate}
        isPending={false}
        isError={false}
        data={data}
        error={null}
      />,
    );

    expect(screen.getByText('This is a simple summary without tags.')).toBeInTheDocument();
  });
});
