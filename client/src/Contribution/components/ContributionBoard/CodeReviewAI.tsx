import React from 'react';
import { CodeReviewResponse } from '@shared/apis/ai/types';
import AIComponent from '@shared/components/AIComponent';

type CodeReviewAIProps = {
  onGenerate: () => void;
  isPending: boolean;
  isError: boolean;
  data?: CodeReviewResponse;
  error?: Error | null;
};

function CodeReviewAI({ onGenerate, isPending, isError, data, error }: CodeReviewAIProps) {
  return (
    <AIComponent
      title="AI Code Review"
      generateText="Generate AI Code Review"
      loadingText="Reviewing your code..."
      onGenerate={onGenerate}
      isPending={isPending}
      isError={isError}
      data={data}
      error={error}
      showRegenerateButton={true}
      renderContent={(data) => (
        <>
          {/* Overall Review */}
          <p className="text-sm leading-relaxed text-zinc-300">{data.review}</p>

          {/* Findings */}
          {data.findings && data.findings.length > 0 && (
            <div className="flex flex-col gap-2">
              {data.findings.map((finding, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-1.5 rounded-md border border-zinc-700/50 bg-zinc-800/30 p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium capitalize text-zinc-400">
                      {finding.type}
                    </span>
                    <span className="rounded bg-zinc-700/50 px-1.5 py-0.5 text-[10px] font-medium uppercase text-zinc-500">
                      {finding.severity}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed text-zinc-400">{finding.message}</p>
                </div>
              ))}
            </div>
          )}

          {/* Summary */}
          {data.summary && (
            <div className="rounded-md border border-zinc-700/50 bg-zinc-800/30 p-2.5">
              <div className="text-xs font-medium text-zinc-500">Summary</div>
              <div className="mt-1 text-xs leading-relaxed text-zinc-400">{data.summary}</div>
            </div>
          )}
        </>
      )}
    />
  );
}

export default CodeReviewAI;
