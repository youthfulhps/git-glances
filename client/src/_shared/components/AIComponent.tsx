import React from 'react';
import { SparkleFillIcon } from '@primer/octicons-react';
import ShinyText from '@shared/components/ShinyText/ShinyText';

type AIComponentProps<T> = {
  title: string;
  generateText: string;
  loadingText: string;
  onGenerate: () => void;
  isPending: boolean;
  isError: boolean;
  data?: T;
  error?: Error | null;
  showRegenerateButton?: boolean;
  renderContent: (data: T, onRegenerate?: () => void) => React.ReactNode;
};

function AIComponent<T>({
  title,
  generateText,
  loadingText,
  onGenerate,
  isPending,
  isError,
  data,
  error,
  showRegenerateButton = false,
  renderContent,
}: AIComponentProps<T>) {
  // Initial state: show generate button
  if (!data && !isPending && !isError) {
    return (
      <button
        onClick={onGenerate}
        className="hover:from-zinc-850 flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-3 hover:border-zinc-600 hover:via-zinc-900/90 hover:to-zinc-900"
      >
        <SparkleFillIcon size={12} className="fill-zinc-400" />
        <ShinyText text={generateText} className="text-sm font-medium text-zinc-700" speed={2} />
      </button>
    );
  }

  // Loading state
  if (isPending) {
    return (
      <div className="flex flex-col gap-1 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-3">
        <div className="flex items-center gap-1.5">
          <SparkleFillIcon size={12} className="fill-zinc-400" />
          <ShinyText text={loadingText} className="text-sm font-medium text-zinc-700" speed={2} />
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col gap-2 rounded-lg border border-red-900/50 bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-950 p-3">
        <p className="text-sm text-red-300/80">
          {error?.message || `Failed to generate ${title.toLowerCase()}`}
        </p>
        <button
          onClick={onGenerate}
          className="mt-1 text-sm text-red-400 underline hover:text-red-300"
        >
          Retry
        </button>
      </div>
    );
  }

  // Success state with data
  if (data) {
    return (
      <div className="flex flex-col gap-3 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <SparkleFillIcon size={12} className="fill-zinc-200" />
            <ShinyText text={title} className="text-sm font-medium text-zinc-700" speed={5} />
          </div>
          {showRegenerateButton && (
            <button
              onClick={onGenerate}
              className="text-xs text-zinc-500 underline transition-colors hover:text-zinc-400"
            >
              Regenerate
            </button>
          )}
        </div>
        {renderContent(data, onGenerate)}
      </div>
    );
  }

  return null;
}

export default AIComponent;
