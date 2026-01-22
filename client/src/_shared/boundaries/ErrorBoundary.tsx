import React, { ReactNode } from 'react';
import Error from '../components/Error';
import SectionV2 from '@layout/components/SectionV2';

type ErrorBoundaryProps = {
  children: ReactNode;
  reset?: (args?: unknown[]) => void;
  gridArea?: string;
  hasToken: boolean;
  mockContent?: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

const initialState: ErrorBoundaryState = {
  hasError: false,
  error: null,
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }

  resetErrorBoundaryState = () => {
    const { reset } = this.props;
    this.setState({ ...initialState });
    if (reset) reset();
  };

  render() {
    const { hasError, error } = this.state;
    const { children, gridArea, hasToken, mockContent } = this.props;

    if (hasError && error) {
      return (
        <Error error={error} reset={this.resetErrorBoundaryState} gridArea={gridArea} />
      );
    }

    if (!hasToken && mockContent) {
      return (
        <SectionV2 gridArea={gridArea} className="blur-[2px] opacity-60">
          {mockContent}
        </SectionV2>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
