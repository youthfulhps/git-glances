import React, { ChangeEventHandler, KeyboardEventHandler } from 'react';
import Input from '@shared/components/Input';
import TextArea from '@shared/components/TextArea';
import { ArrowRightIcon } from '@primer/octicons-react';

type EnhanceDetailProps = {
  issueTitle: string;
  issueBody: string;
  onIssueTitleChange: ChangeEventHandler;
  onIssueTitleKeyDown: KeyboardEventHandler;
  onIssueBodyChange: ChangeEventHandler;
  isConfirmShowing: boolean;
  setHasConfirmOverlay: (hasConfirmOverlay: boolean) => void;
};

function EnhanceDetail({
  issueTitle,
  issueBody,
  onIssueTitleChange,
  onIssueTitleKeyDown,
  onIssueBodyChange,
  isConfirmShowing,
  setHasConfirmOverlay,
}: EnhanceDetailProps) {
  const handleConfirmIconClick = () => {
    setHasConfirmOverlay(true);
  };

  return (
    <div>
      <div className="mb-2 text-xs text-zinc-400">Please report any improvements or issues.</div>
      <div className="relative flex items-center">
        <Input
          className="mb-1"
          placeholder="Enter title..."
          value={issueTitle}
          onChange={onIssueTitleChange}
          onKeyDown={onIssueTitleKeyDown}
        />
        {isConfirmShowing ? (
          <button onClick={handleConfirmIconClick} tabIndex={-1}>
            <ArrowRightIcon
              size={20}
              className="absolute top-4 right-4 animate-rising fill-emerald-300 hover:fill-emerald-200"
            />
          </button>
        ) : null}
      </div>

      <TextArea placeholder="Enter comments..." value={issueBody} onChange={onIssueBodyChange} />
    </div>
  );
}

export default EnhanceDetail;
