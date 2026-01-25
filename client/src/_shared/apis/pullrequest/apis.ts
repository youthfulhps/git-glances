import { axiosInstance } from '@shared/apis';
import {
  GetPullRequestList,
  GetReviewRequestedPRs,
} from '@shared/apis/pullrequest/types';

export const getMyPullRequests: GetPullRequestList = (params) => {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.perPage) searchParams.append('per_page', params.perPage.toString());
  if (params?.state) searchParams.append('state', params.state);
  if (params?.sort) searchParams.append('sort', params.sort);
  if (params?.direction) searchParams.append('direction', params.direction);

  return axiosInstance.get(`/user/issues?${searchParams.toString()}`);
};

export const getReviewRequestedPRs: GetReviewRequestedPRs = (params) => {
  const searchParams = new URLSearchParams();
  searchParams.append('q', 'is:pr is:open review-requested:@me');
  if (params?.page) searchParams.append('page', params.page.toString());
  if (params?.perPage) searchParams.append('per_page', params.perPage.toString());
  if (params?.sort) searchParams.append('sort', params.sort);
  if (params?.direction) searchParams.append('order', params.direction);

  return axiosInstance.get(`/search/issues?${searchParams.toString()}`);
};
