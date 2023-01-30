import React, { ReactNode } from 'react';
import PulseSection from '@layout/components/PulseSection';
import { hasAuthCookie } from '@shared/utils/cookie';
import Error from '../components/Error';

type ErrorBoundaryProps = {
  children: ReactNode;
  reset?: (args?: unknown[]) => void;
  gridArea?: string;
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
    const { children, gridArea } = this.props;

    if (!hasAuthCookie()) {
      return <PulseSection gridArea={gridArea} />;
    }

    if (hasError && error) {
      return (
        <Error
          errorMessage={errorMessage}
          reset={this.resetErrorBoundaryState}
          gridArea={gridArea}
        />
      );
    }

    return children;
  }
}

export default ErrorBoundary;
