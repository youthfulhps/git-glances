export enum ErrorCode {
  // Authentication errors
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  TOKEN_REQUIRED = 'TOKEN_REQUIRED',

  // Rate limiting
  RATE_LIMIT = 'RATE_LIMIT',

  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT = 'TIMEOUT',

  // Server errors
  SERVER_ERROR = 'SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',

  // Client errors
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',

  // Unknown
  UNKNOWN = 'UNKNOWN',
}

export class GitGlancesError extends Error {
  constructor(
    public code: ErrorCode,
    message: string,
    public statusCode?: number,
    public originalError?: Error,
  ) {
    super(message);
    this.name = 'GitGlancesError';
    Object.setPrototypeOf(this, GitGlancesError.prototype);
  }

  getUserMessage(): string {
    switch (this.code) {
      case ErrorCode.UNAUTHORIZED:
      case ErrorCode.FORBIDDEN:
      case ErrorCode.TOKEN_EXPIRED:
        return 'Your session has expired. Please sign in again.';

      case ErrorCode.TOKEN_REQUIRED:
        return 'Please sign in with your GitHub token.';

      case ErrorCode.RATE_LIMIT:
        return 'Too many requests. Please wait a moment and try again.';

      case ErrorCode.NETWORK_ERROR:
        return 'Network connection failed. Please check your internet connection.';

      case ErrorCode.TIMEOUT:
        return 'Request timed out. Please try again.';

      case ErrorCode.SERVER_ERROR:
        return 'Server error occurred. Please try again later.';

      case ErrorCode.SERVICE_UNAVAILABLE:
        return 'Service is temporarily unavailable. Please try again later.';

      case ErrorCode.NOT_FOUND:
        return 'The requested resource was not found.';

      case ErrorCode.VALIDATION_ERROR:
        return this.message || 'Invalid request. Please check your input.';

      default:
        return 'An unexpected error occurred. Please try again.';
    }
  }

  isRetryable(): boolean {
    return [
      ErrorCode.NETWORK_ERROR,
      ErrorCode.TIMEOUT,
      ErrorCode.SERVER_ERROR,
      ErrorCode.SERVICE_UNAVAILABLE,
    ].includes(this.code);
  }
}

/** 토큰이 없을 때 요청 인터셉터가 요청을 취소하며 남기는 메시지 */
export const TOKEN_REQUIRED_CANCEL_MESSAGE = 'Access token is required!';

export function parseAxiosError(error: any): GitGlancesError {
  // 요청 인터셉터가 토큰이 없어 요청을 취소한 경우 (다른 이유의 취소와 구분)
  if (error?.code === 'ERR_CANCELED' && error.message === TOKEN_REQUIRED_CANCEL_MESSAGE) {
    return new GitGlancesError(
      ErrorCode.TOKEN_REQUIRED,
      'Access token is required',
      undefined,
      error,
    );
  }

  // 인터셉터 등에서 발생한 axios 외부 에러는 네트워크 에러로 뭉개지 않는다
  if (!error?.isAxiosError) {
    return new GitGlancesError(
      ErrorCode.UNKNOWN,
      error?.message || 'Unknown error occurred',
      undefined,
      error,
    );
  }

  // Network error (no response)
  if (!error.response) {
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      return new GitGlancesError(ErrorCode.TIMEOUT, 'Request timed out', undefined, error);
    }
    return new GitGlancesError(ErrorCode.NETWORK_ERROR, 'Network error', undefined, error);
  }

  const status = error.response.status;

  // Status code based errors
  switch (status) {
    case 401:
      return new GitGlancesError(
        ErrorCode.UNAUTHORIZED,
        'Unauthorized access',
        status,
        error,
      );

    case 403:
      return new GitGlancesError(
        ErrorCode.FORBIDDEN,
        'Access forbidden',
        status,
        error,
      );

    case 404:
      return new GitGlancesError(
        ErrorCode.NOT_FOUND,
        'Resource not found',
        status,
        error,
      );

    case 429:
      return new GitGlancesError(
        ErrorCode.RATE_LIMIT,
        'Rate limit exceeded',
        status,
        error,
      );

    case 500:
    case 502:
    case 504:
      return new GitGlancesError(
        ErrorCode.SERVER_ERROR,
        'Server error',
        status,
        error,
      );

    case 503:
      return new GitGlancesError(
        ErrorCode.SERVICE_UNAVAILABLE,
        'Service unavailable',
        status,
        error,
      );

    default:
      if (status >= 400 && status < 500) {
        return new GitGlancesError(
          ErrorCode.VALIDATION_ERROR,
          error.response.data?.message || 'Validation error',
          status,
          error,
        );
      }
      return new GitGlancesError(
        ErrorCode.UNKNOWN,
        'Unknown error occurred',
        status,
        error,
      );
  }
}
