import React from 'react';
import { QuestionIcon } from '@primer/octicons-react';

type GuideBadgeProps = {
  onToggle: () => void;
  isGuideShowing: boolean;
};

function GuideBadge({ onToggle, isGuideShowing }: GuideBadgeProps) {
  return (
    <button
      onClick={onToggle}
      className="group flex h-[58px] w-[40px] items-center overflow-hidden rounded-2xl border border-solid border-zinc-500 p-2 duration-500 hover:w-[102px]"
    >
      <QuestionIcon size={20} className="ml-[2px] mr-3 fill-zinc-400 group-hover:fill-zinc-100" />
      <span className="text-base font-thin text-zinc-400 drop-shadow-md">
        {isGuideShowing ? 'Hide' : 'View'} Guide
      </span>
    </button>
  );
}

export default GuideBadge;
