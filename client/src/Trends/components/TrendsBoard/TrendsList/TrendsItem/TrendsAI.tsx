import { SummarizeResponse } from '@shared/apis/ai';
import React from 'react';
import { SparkleFillIcon } from '@primer/octicons-react';
import ShinyText from '@shared/components/ShinyText/ShinyText';
import StarBorder from '@shared/components/StarBorder';

type TrendsAIProps = {
  onGenerate: () => void;
  isPending: boolean;
  isError: boolean;
  data?: SummarizeResponse;
  error?: Error | null;
};

function TrendsAI({ onGenerate, isPending, isError, data, error }: TrendsAIProps) {
  if (!data && !isPending && !isError) {
    return (
      <StarBorder
        as="button"
        onClick={(e) => {
          e.preventDefault();
          onGenerate();
        }}
        className="w-full"
        innerClassName="flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-2 hover:border-zinc-600 hover:via-zinc-900/90 hover:to-zinc-900"
        color="rgba(250, 250, 250, 0.8)"
        speed="8s"
        thickness={1}
      >
        <SparkleFillIcon size={10} className="fill-zinc-400" />
        <ShinyText
          text="Generate AI Summary"
          className="text-xs font-medium text-zinc-700"
          speed={2}
        />
      </StarBorder>
    );
  }

  if (isPending) {
    return (
      <StarBorder
        as="div"
        innerClassName="flex items-center gap-1.5 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-2"
        color="rgba(250, 250, 250, 0.8)"
        speed="8s"
        thickness={1}
      >
        <SparkleFillIcon size={10} className="fill-zinc-400" />
        <ShinyText
          text="Generating AI summary..."
          className="text-xs font-medium text-zinc-700"
          speed={2}
        />
      </StarBorder>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-1 rounded-lg border border-red-900/50 bg-gradient-to-br from-red-950/30 via-zinc-900 to-zinc-950 p-3">
        <p className="text-xs text-red-300/80">{error?.message || 'Failed to generate summary'}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            onGenerate();
          }}
          className="mt-1 text-xs text-red-400 underline hover:text-red-300"
        >
          Retry
        </button>
      </div>
    );
  }

  if (data) {
    return (
      <div className="flex flex-col gap-1 rounded-lg border border-zinc-700/50 bg-gradient-to-br from-zinc-900 via-zinc-900/80 to-zinc-950 p-3">
        <div className="flex items-center gap-0.5">
          <SparkleFillIcon size={10} className="mr-[2px] fill-zinc-200" />
          <ShinyText text="AI Summary" className="text-xs font-medium text-zinc-700" speed={5} />
        </div>
        <p className="text-xs leading-relaxed text-zinc-400">{data.summary}</p>
        {data.tags && data.tags.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-lg bg-zinc-500/30 px-2 py-0.5 text-xs text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default TrendsAI;
