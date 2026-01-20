import { AsyncAxiosResponse } from '@shared/apis/types';

export type User = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean | null;
  bio: string;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
};

export type GetUser = () => AsyncAxiosResponse<User>;

export type UserEvent = {
  id: string;
  type: string;
  actor: {
    login: string;
    avatar_url: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    action?: string;
    ref?: string;
    ref_type?: string;
    size?: number;
    commits?: Array<{ message: string }>;
    pull_request?: {
      title: string;
      number: number;
      html_url: string;
    };
    issue?: {
      title: string;
      number: number;
    };
  };
  created_at: string;
};

export type GetUserEvents = (username: string) => AsyncAxiosResponse<UserEvent[]>;
