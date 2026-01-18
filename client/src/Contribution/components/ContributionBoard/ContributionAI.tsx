import { ContributionInsightResponse } from '@shared/apis/ai';
import React from 'react';
import AIComponent from '@shared/components/AIComponent';

type ContributionAIProps = {
  onGenerate: () => void;
  isPending: boolean;
  isError: boolean;
  data?: ContributionInsightResponse;
  error?: Error | null;
};

function ContributionAI({ onGenerate, isPending, isError, data, error }: ContributionAIProps) {
  return (
    <AIComponent
      title="AI Productivity Insight"
      generateText="Generate AI Insight"
      loadingText="Generating AI insight..."
      onGenerate={onGenerate}
      isPending={isPending}
      isError={isError}
      data={data}
      error={error}
      showRegenerateButton={false}
      renderContent={(data) => (
        <>
          <p className="text-sm leading-relaxed text-zinc-300">{data.insight}</p>
          {data.tags && data.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {data.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-lg bg-zinc-500/30 px-2 py-1 text-xs text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </>
      )}
    />
  );
}

export default ContributionAI;
