import {
  AsyncAxiosResponse,
  AsyncListSearchNestedFieldResponse,
  AsyncNestedAxiosResponse,
} from '@shared/apis/types';

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

export type TrendsRepository = Omit<Repository, 'defaultBranchRef'> & {
  owner: {
    login: string;
    avatarUrl: string;
  };
  createdAt: string;
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
  forks: {
    totalCount: number;
  };
  stargazers: {
    totalCount: number;
  };
};

export type RepositoryNodes = {
  nodes: Repository[];
};

export type GetRepoList = () => AsyncNestedAxiosResponse<RepositoryNodes>;

export type GetRepo = (repoName: string) => AsyncNestedAxiosResponse<Repository>;

export type GetTrendsRepoList = (
  language: string,
  created: string,
  after?: string
) => AsyncListSearchNestedFieldResponse<TrendsRepository>;

type PostRepoIssuePayload = {
  issueTitle: string;
  issueBody: string;
};

export type PostRepoIssue = (issue: PostRepoIssuePayload) => AsyncAxiosResponse<any>;
