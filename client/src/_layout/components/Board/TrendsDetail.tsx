import React from 'react';
import useTrendsRepoListQuery from '../../../Trends/queries/useTrendsRepoListQuery';

function TrendsDetail() {
  const trendsRepoList = useTrendsRepoListQuery();

  if (!trendsRepoList || trendsRepoList.length === 0) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-zinc-500">No trending repositories available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {trendsRepoList.map((repo, index) => (
        <a
          key={index}
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col gap-1 rounded-lg border border-zinc-700 p-3 hover:border-zinc-600 hover:bg-zinc-800/50"
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-zinc-200">{repo.name}</span>
            {repo.language && (
              <span className="rounded-md bg-zinc-700 px-2 py-0.5 text-xs text-zinc-400">
                {repo.language}
              </span>
            )}
          </div>
          {repo.description && (
            <p className="text-xs text-zinc-400 line-clamp-2">{repo.description}</p>
          )}
          <div className="mt-1 flex items-center gap-3 text-xs text-zinc-500">
            {repo.stargazers_count !== undefined && <span>⭐ {repo.stargazers_count}</span>}
            {repo.forks_count !== undefined && <span>🔱 {repo.forks_count}</span>}
          </div>
        </a>
      ))}
    </div>
  );
}

export default TrendsDetail;
