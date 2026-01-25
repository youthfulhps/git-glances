import { useState, useCallback } from 'react';
import { getRepositoryCommits } from '@shared/apis/contribution';
import { RepositoryCommit } from '@shared/apis/contribution/types';

type RepoCommitsState = {
  [key: string]: {
    commits: RepositoryCommit[];
    loading: boolean;
    expanded: boolean;
  };
};

type UseRepositoryCommitsReturn = {
  repoCommits: RepoCommitsState;
  toggleRepo: (owner: string, repo: string, dateRange: { from: string; to: string }) => Promise<void>;
};

export const useRepositoryCommits = (): UseRepositoryCommitsReturn => {
  const [repoCommits, setRepoCommits] = useState<RepoCommitsState>({});

  const toggleRepo = useCallback(async (owner: string, repo: string, dateRange: { from: string; to: string }) => {
    const key = `${owner}/${repo}`;

    // If already expanded, just collapse
    if (repoCommits[key]?.expanded) {
      setRepoCommits((prev) => ({
        ...prev,
        [key]: { ...prev[key], expanded: false },
      }));
      return;
    }

    // If not loaded yet, fetch commits
    if (!repoCommits[key]) {
      setRepoCommits((prev) => ({
        ...prev,
        [key]: { commits: [], loading: true, expanded: true },
      }));

      try {
        const { data } = await getRepositoryCommits(owner, repo, {
          since: dateRange.from,
          until: dateRange.to,
          per_page: 5,
        });

        setRepoCommits((prev) => ({
          ...prev,
          [key]: { commits: data, loading: false, expanded: true },
        }));
      } catch (error) {
        console.error('Error fetching commits:', error);
        setRepoCommits((prev) => ({
          ...prev,
          [key]: { commits: [], loading: false, expanded: false },
        }));
      }
    } else {
      // Already loaded, just expand
      setRepoCommits((prev) => ({
        ...prev,
        [key]: { ...prev[key], expanded: true },
      }));
    }
  }, [repoCommits]);

  return { repoCommits, toggleRepo };
};
