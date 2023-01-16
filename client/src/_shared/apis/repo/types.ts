import { AsyncNestedAxiosResponse } from '@shared/apis/types';

type GitActor = {
  name: string;
  email: string;
  avatarUrl: string;
};

type CommitNode = {
  url: string;
  committedDate: string;
  message: string;
  additions: number;
  deletions: number;
  author: GitActor;
};

type RepositoryCommitHistory = {
  totalCount: number;
  nodes: CommitNode[];
};

type RepositoryCommitTarget = {
  history: RepositoryCommitHistory;
};

type RepositoryDefaultBranchRef = {
  name: string;
  target: RepositoryCommitTarget;
};

export type Repository = {
  url: string;
  name: string;
  description: string;
  pushedAt: string;
  updatedAt: string;
  defaultBranchRef: RepositoryDefaultBranchRef;
};

export type RepositoryNodes = {
  nodes: Repository[];
};

export type GetRepoList = () => AsyncNestedAxiosResponse<RepositoryNodes>;

export type GetRepo = (
  repoName: string
) => AsyncNestedAxiosResponse<Repository>;
