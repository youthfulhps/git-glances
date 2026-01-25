import React from 'react';
import { TrendsRepository } from '@shared/apis/repo';
import StarredSummaryItem from '../../../StarredSummary/StarredSummaryItem';
import { summarizeTrendsRepositoryMutationOptions } from '../../../../../Trends/mutations/useSummarizeTrendsRepoMutation';
import { Mutation } from '@suspensive/react-query';
import TrendsAI from '../../../../../Trends/components/TrendsBoard/TrendsList/TrendsItem/TrendsAI';

type StarredItemProps = {
  repo: TrendsRepository;
};

function StarredItem({ repo }: StarredItemProps) {
  return (
    <div className="animate-fadeInUp flex flex-col gap-2 rounded-lg border border-zinc-700 p-3 hover:border-zinc-400">
      <a href={repo.url} target="_blank" rel="noreferrer" className="flex flex-col">
        <StarredSummaryItem starredRepo={repo} />
      </a>

      <Mutation {...summarizeTrendsRepositoryMutationOptions()}>
        {({ mutate, isPending, isError, data, error }) => (
          <TrendsAI
            onGenerate={() => mutate({ repositoryName: repo.name, description: repo.description })}
            isPending={isPending}
            isError={isError}
            data={data}
            error={error}
          />
        )}
      </Mutation>
    </div>
  );
}

export default StarredItem;
