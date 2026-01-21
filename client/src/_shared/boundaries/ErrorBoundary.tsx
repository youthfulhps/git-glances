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
  error: any;
  errorMessage: string | null;
};

const initialState: ErrorBoundaryState = {
  hasError: false,
  error: null,
  errorMessage: null,
};

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: any) {
    return {
      hasError: true,
      error,
      errorMessage: typeof error.message === 'string' ? error.message : null,
    };
  }

  resetErrorBoundaryState = () => {
    const { reset } = this.props;
    this.setState({ ...initialState });
    if (reset) reset();
  };

  render() {
    const { hasError, error, errorMessage } = this.state;
    const { children, gridArea, hasToken, mockContent } = this.props;

    if (hasError && error) {
      return (
        <Error
          errorMessage={errorMessage}
          reset={this.resetErrorBoundaryState}
          gridArea={gridArea}
        />
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
