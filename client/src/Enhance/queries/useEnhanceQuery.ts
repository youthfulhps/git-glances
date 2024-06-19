import { useMutation } from '@tanstack/react-query';
import { postRepoIssue } from '@shared/apis/repo';
import useInput from '@shared/hooks/useInput';
import { useState } from 'react';
import { AxiosError } from 'axios';

const useEnhanceQuery = () => {
  const [isConfirmShowing, setIsConfirmShowing] = useState(false);
  const [hasConfirmOverlay, setHasConfirmOverlay] = useState(false);

  const {
    value: issueTitle,
    resetValue: resetIssueTitle,
    onChange: onIssueTitleChange,
    onKeyDown: onIssueTitleKeyDown,
  } = useInput('', () => setHasConfirmOverlay(true));

  const {
    value: issueBody,
    resetValue: resetIssueBody,
    onChange: onIssueBodyChange,
  } = useInput('');

  const { mutate, isIdle, isPending, isSuccess, isError, reset } = useMutation<any, AxiosError>({
    mutationFn: async () => {
      await postRepoIssue({ issueTitle, issueBody });
    },
  });

  const mutatePostIssue = () => {
    setHasConfirmOverlay(false);
    mutate();
  };

  return {
    mutatePostIssue,
    reset,
    isIdle,
    isPending,
    isSuccess,
    isError,
    issueTitle,
    resetIssueTitle,
    onIssueTitleChange,
    onIssueTitleKeyDown,
    resetIssueBody,
    issueBody,
    onIssueBodyChange,
    isConfirmShowing,
    setIsConfirmShowing,
    hasConfirmOverlay,
    setHasConfirmOverlay,
  };
};

export default useEnhanceQuery;
