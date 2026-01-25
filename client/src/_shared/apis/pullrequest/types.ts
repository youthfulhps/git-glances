import { User } from '@shared/apis/user';
import { AsyncAxiosResponse } from '@shared/apis/types';

export type PullRequestState = 'open' | 'closed' | 'all';

export type PullRequest = {
  id: number;
  node_id: string;
  number: number;
  state: 'open' | 'closed';
  locked: boolean;
  title: string;
  user: User;
  body: string | null;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  merged_at: string | null;
  merge_commit_sha: string | null;
  assignee: User | null;
  assignees: User[];
  requested_reviewers: User[];
  requested_teams: any[];
  labels: Array<{
    id: number;
    node_id: string;
    url: string;
    name: string;
    color: string;
    default: boolean;
    description: string | null;
  }>;
  draft: boolean;
  html_url: string;
  diff_url: string;
  patch_url: string;
  repository_url: string;
  head: {
    label: string;
    ref: string;
    sha: string;
    user: User;
    repo: {
      id: number;
      name: string;
      full_name: string;
      private: boolean;
      html_url: string;
      description: string | null;
    };
  };
  base: {
    label: string;
    ref: string;
    sha: string;
    user: User;
    repo: {
      id: number;
      name: string;
      full_name: string;
      private: boolean;
      html_url: string;
      description: string | null;
    };
  };
  _links: {
    self: { href: string };
    html: { href: string };
    issue: { href: string };
    comments: { href: string };
    review_comments: { href: string };
    review_comment: { href: string };
    commits: { href: string };
    statuses: { href: string };
  };
  author_association: string;
  auto_merge: any | null;
  active_lock_reason: string | null;
};

export type PullRequestSearchParams = {
  page?: number;
  perPage?: number;
  state?: PullRequestState;
  sort?: 'created' | 'updated' | 'popularity' | 'long-running';
  direction?: 'asc' | 'desc';
};

export type GetPullRequestList = (
  params?: PullRequestSearchParams,
) => AsyncAxiosResponse<PullRequest[]>;

export type GetReviewRequestedPRs = (
  params?: PullRequestSearchParams,
) => AsyncAxiosResponse<{ items: PullRequest[] }>;
