import React, { ReactNode } from 'react';
import PulseSection from '@layout/components/PulseSection';
import { getChromeStorageItem } from '@shared/utils/chrome';
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
  hasToken: boolean;
};

const initialState: ErrorBoundaryState = {
  hasError: false,
  error: null,
  errorMessage: null,
  hasToken: false,
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

  componentDidMount() {
    if (process.env.IS_WEB) {
      const localStorageToken = localStorage.getItem('gitGlances:token');
      this.setState({ ...initialState, hasToken: !!localStorageToken });
      return;
    }
    getChromeStorageItem<string>('gitGlances:token').then((value) => {
      const chromeStorageToken = JSON.parse(value);
      this.setState({ ...initialState, hasToken: !!chromeStorageToken });
    });
  }

  resetErrorBoundaryState = () => {
    const { reset } = this.props;
    this.setState({ ...initialState });
    if (reset) reset();
  };

  render() {
    const { hasError, error, errorMessage, hasToken } = this.state;
    const { children, gridArea } = this.props;

    if (!hasToken) {
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
