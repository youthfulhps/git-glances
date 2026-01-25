import { getContributionsCollectionQuery } from '@shared/apis/contribution/queries';
import { axiosInstance } from '@shared/apis';
import {
  GetContributionsCollection,
  GetCommitDiff,
  GetPullRequestFiles,
  GetRepositoryCommits,
} from '@shared/apis/contribution/types';

export const getContributionsCollection: GetContributionsCollection = (
  from: string,
  to: string
) => {
  const body = {
    query: getContributionsCollectionQuery(from, to),
  };

  return axiosInstance.post('/graphql', body);
};

export const getCommitDiff: GetCommitDiff = async (owner: string, repo: string, sha: string) => {
  return axiosInstance.get(`/repos/${owner}/${repo}/commits/${sha}`);
};

export const getPullRequestFiles: GetPullRequestFiles = async (
  owner: string,
  repo: string,
  pullNumber: number
) => {
  return axiosInstance.get(`/repos/${owner}/${repo}/pulls/${pullNumber}/files`);
};

export const getRepositoryCommits: GetRepositoryCommits = async (
  owner: string,
  repo: string,
  params = {}
) => {
  const { since, until, per_page = 5 } = params;
  const queryParams = new URLSearchParams();

  if (since) queryParams.append('since', since);
  if (until) queryParams.append('until', until);
  queryParams.append('per_page', per_page.toString());

  return axiosInstance.get(`/repos/${owner}/${repo}/commits?${queryParams.toString()}`);
};
