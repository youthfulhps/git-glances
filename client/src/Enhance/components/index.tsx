import React, { useEffect } from 'react';
import OptionalSection from '@layout/components/OptionalSection';
import SectionSpinner from '@shared/components/Spinner/SectionSpinner';
import { CheckCircleFillIcon } from '@primer/octicons-react';
import Check from '@shared/components/Check';
import Error from '@shared/components/Error';
import EnhanceDetail from './EnhanceDetail';
import useEnhanceQuery from '../queries/useEnhanceQuery';

function Enhance() {
  const {
    mutatePostIssue,
    reset,
    isIdle,
    isLoading,
    isError,
    isSuccess,
    issueTitle,
    onIssueTitleChange,
    onIssueTitleKeyDown,
    resetIssueTitle,
    issueBody,
    onIssueBodyChange,
    resetIssueBody,
    isConfirmShowing,
    setIsConfirmShowing,
    hasConfirmOverlay,
    setHasConfirmOverlay,
  } = useEnhanceQuery();

  useEffect(() => {
    setIsConfirmShowing(!!issueTitle);
  }, [setIsConfirmShowing, issueTitle]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        reset();
        resetIssueTitle();
        resetIssueBody();
      }, 3000);
    }
  }, [reset, isSuccess, resetIssueTitle, resetIssueBody]);

  if (isLoading) return <SectionSpinner gridArea="Enhance" />;
  if (isSuccess) return <Check gridArea="Enhance" />;
  if (isError)
    return (
      <Error
        errorMessage="Temporary error has occurred."
        reset={mutatePostIssue}
        gridArea="Enhance"
      />
    );

  return (
    <OptionalSection
      gridArea="Enhance"
      hasOverlay={hasConfirmOverlay}
      onConfirm={mutatePostIssue}
      onCancel={() => setHasConfirmOverlay(false)}
    >
      {isIdle ? (
        <EnhanceDetail
          issueTitle={issueTitle}
          onIssueTitleChange={onIssueTitleChange}
          onIssueTitleKeyDown={onIssueTitleKeyDown}
          issueBody={issueBody}
          onIssueBodyChange={onIssueBodyChange}
          isConfirmShowing={isConfirmShowing}
          setHasConfirmOverlay={setHasConfirmOverlay}
        />
      ) : null}
      {isSuccess ? <CheckCircleFillIcon /> : null}
    </OptionalSection>
  );
}

export default Enhance;
