import { axiosInstance } from '@shared/apis';
import { GetRepo, GetRepoList, GetTrendsRepoList, PostRepoIssue } from '@shared/apis/repo/types';
import { getDailyRange } from '@shared/utils/date';
import { GET_REPO_LIST_QUERY, getRepoQuery, getTrendsRepoListQuery } from './queries';

export const getRepoList: GetRepoList = () => {
  const body = {
    query: GET_REPO_LIST_QUERY,
  };

  return axiosInstance.post('/graphql', body);
};

export const getRepo: GetRepo = (repoName) => {
  const body = {
    query: getRepoQuery(repoName),
  };

  return axiosInstance.post('/graphql', body);
};

export const getTrendsRepoList: GetTrendsRepoList = (language: string) => {
  const body = {
    query: getTrendsRepoListQuery(language, getDailyRange()),
  };

  return axiosInstance.post('/graphql', body);
};

export const postRepoIssue: PostRepoIssue = (issue) => {
  const defaultIssue = {
    assignee: 'youthfulhps',
    title: issue.issueTitle,
    body: issue.issueBody,
  };

  return axiosInstance.post('/repos/youthfulhps/git-glances/issues', defaultIssue);
};
