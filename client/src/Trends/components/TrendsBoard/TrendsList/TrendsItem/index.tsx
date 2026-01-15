import React from 'react';
import { TrendsRepository } from '@shared/apis/repo';
import TrendsSummaryItem from '../../../TrendsSummary/TrendsSummaryItem';
import { summarizeTrendsRepositoryMutationOptions } from '../../../../mutations/useSummarizeTrendsRepoMutation';
import { Mutation } from '@suspensive/react-query';
import TrendsAI from './TrendsAI';

type TrendsItemProps = {
  repo: TrendsRepository;
};

function TrendsItem({ repo }: TrendsItemProps) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-zinc-700 p-3 hover:border-zinc-400">
      <a href={repo.url} target="_blank" rel="noreferrer" className="flex flex-col">
        <TrendsSummaryItem trendsRepo={repo} />
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

export default TrendsItem;
