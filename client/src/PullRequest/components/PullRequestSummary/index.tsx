import React from 'react';
import { GitPullRequestIcon } from '@primer/octicons-react';
import ShinyText from '@shared/components/ShinyText/ShinyText';
import SectionV2 from '@layout/components/SectionV2';
import { useBoard } from '@shared/contexts/BoardContext';
import PullRequestInfiniteQuery from '../PullRequestInfiniteQuery';
import { PullRequest } from '@shared/apis/pullrequest';

const mockPR: PullRequest = {
  id: 1,
  node_id: 'mock',
  number: 123,
  state: 'open',
  locked: false,
  title: 'Review requested PR',
  user: {
    login: 'user',
    id: 1,
    node_id: 'mock',
    avatar_url: '',
    gravatar_id: '',
    url: '',
    html_url: '',
    followers_url: '',
    following_url: '',
    gists_url: '',
    starred_url: '',
    subscriptions_url: '',
    organizations_url: '',
    repos_url: '',
    events_url: '',
    received_events_url: '',
    type: 'User',
    site_admin: false,
  },
  body: null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  closed_at: null,
  merged_at: null,
  merge_commit_sha: null,
  assignee: null,
  assignees: [],
  requested_reviewers: [],
  requested_teams: [],
  labels: [],
  draft: false,
  html_url: 'https://github.com',
  diff_url: '',
  patch_url: '',
  repository_url: '',
  head: {
    label: '',
    ref: '',
    sha: '',
    user: {
      login: 'user',
      id: 1,
      node_id: 'mock',
      avatar_url: '',
      gravatar_id: '',
      url: '',
      html_url: '',
      followers_url: '',
      following_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      received_events_url: '',
      type: 'User',
      site_admin: false,
    },
    repo: {
      id: 1,
      name: 'repo',
      full_name: 'user/repo',
      private: false,
      html_url: '',
      description: null,
    },
  },
  base: {
    label: '',
    ref: '',
    sha: '',
    user: {
      login: 'user',
      id: 1,
      node_id: 'mock',
      avatar_url: '',
      gravatar_id: '',
      url: '',
      html_url: '',
      followers_url: '',
      following_url: '',
      gists_url: '',
      starred_url: '',
      subscriptions_url: '',
      organizations_url: '',
      repos_url: '',
      events_url: '',
      received_events_url: '',
      type: 'User',
      site_admin: false,
    },
    repo: {
      id: 1,
      name: 'repo',
      full_name: 'user/repo',
      private: false,
      html_url: '',
      description: null,
    },
  },
  _links: {
    self: { href: '' },
    html: { href: '' },
    issue: { href: '' },
    comments: { href: '' },
    review_comments: { href: '' },
    review_comment: { href: '' },
    commits: { href: '' },
    statuses: { href: '' },
  },
  author_association: '',
  auto_merge: null,
  active_lock_reason: null,
};

function PullRequestSummary() {
  const { openPullRequestBoard } = useBoard();

  const handleClick = () => {
    openPullRequestBoard();
  };

  return (
    <PullRequestInfiniteQuery gridArea="PullRequest" mockContent={<MockContent />}>
      {({ data }) => {
        const pages = (data as { pages?: Array<{ pullRequests: PullRequest[] }> })?.pages;
        const allPRs = pages?.flatMap((page) => page.pullRequests) ?? [];
        const prCount = allPRs.length;

        return (
          <SectionV2 onClick={handleClick} gridArea="PullRequest">
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="flex flex-row items-center justify-center gap-x-1.5">
                <GitPullRequestIcon size={10} className="fill-zinc-300" />
                <ShinyText
                  text={
                    prCount > 0
                      ? `${prCount} review${prCount > 1 ? 's' : ''} requested`
                      : 'No reviews requested'
                  }
                  className={prCount > 0 ? 'text-xs text-zinc-200' : 'text-xs text-zinc-500'}
                />
              </div>
            </div>
          </SectionV2>
        );
      }}
    </PullRequestInfiniteQuery>
  );
}

function MockContent() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-row items-center justify-center gap-x-1.5">
        <GitPullRequestIcon size={10} className="fill-zinc-300" />
        <ShinyText text="2 reviews requested" className="text-xs text-zinc-200" />
      </div>
    </div>
  );
}

export default PullRequestSummary;
