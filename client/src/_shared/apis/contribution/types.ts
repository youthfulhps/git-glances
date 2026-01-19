import { AsyncNestedAxiosResponse } from '@shared/apis/types';

export type ContributionLevel = 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE';

export type ContributionDay = {
  contributionCount: number;
  date: string;
  contributionLevel: ContributionLevel;
};

export type ContributionWeek = {
  contributionDays: ContributionDay[];
};

export type Repository = {
  name: string;
  owner: {
    login: string;
  };
  url: string;
};

export type CommitContribution = {
  occurredAt: string;
  commitCount: number;
};

export type CommitContributionsByRepository = {
  repository: Repository;
  contributions: {
    nodes: CommitContribution[];
  };
};

export type PullRequest = {
  title: string;
  url: string;
  state: 'OPEN' | 'CLOSED' | 'MERGED';
  createdAt: string;
  mergedAt: string | null;
  closed: boolean;
  repository: {
    name: string;
    owner: {
      login: string;
    };
  };
};

export type PullRequestContribution = {
  occurredAt: string;
  pullRequest: PullRequest;
};

export type ContributionsCollection = {
  totalIssueContributions: number;
  totalCommitContributions: number;
  totalPullRequestContributions: number;
  totalPullRequestReviewContributions: number;
  restrictedContributionsCount: number;
  contributionCalendar: {
    totalContributions: number;
    weeks: ContributionWeek[];
  };
  commitContributionsByRepository?: CommitContributionsByRepository[];
  pullRequestContributions?: {
    nodes: PullRequestContribution[];
  };
};

export type GetContributionsCollection = (
  from: string,
  to: string
) => AsyncNestedAxiosResponse<ContributionsCollection>;

// Commit Diff Types
export type CommitFile = {
  filename: string;
  status: 'added' | 'removed' | 'modified' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  previous_filename?: string;
};

export type CommitDiff = {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  stats: {
    additions: number;
    deletions: number;
    total: number;
  };
  files: CommitFile[];
};

export type GetCommitDiff = (
  owner: string,
  repo: string,
  sha: string
) => Promise<{ data: CommitDiff }>;

// PR Diff Types
export type PullRequestFile = {
  filename: string;
  status: 'added' | 'removed' | 'modified' | 'renamed';
  additions: number;
  deletions: number;
  changes: number;
  patch?: string;
  previous_filename?: string;
};

export type GetPullRequestFiles = (
  owner: string,
  repo: string,
  pullNumber: number
) => Promise<{ data: PullRequestFile[] }>;

// Repository Commits Types
export type RepositoryCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  html_url: string;
};

export type GetRepositoryCommits = (
  owner: string,
  repo: string,
  params?: {
    since?: string;
    until?: string;
    per_page?: number;
  }
) => Promise<{ data: RepositoryCommit[] }>;
