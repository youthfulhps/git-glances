import { AsyncNestedAxiosResponse } from '@shared/apis/types';

export type LanguageInfo = {
  name: string;
  color: string;
};

export type LanguageEdge = {
  size: number;
  node: LanguageInfo;
};

export type LanguageEdges = {
  edges: LanguageEdge[];
};

export type RepositoryNode = {
  name: string;
  url: string;
  primaryLanguage: LanguageInfo | null;
  languages: LanguageEdges;
};

export type LanguageNodes = {
  nodes: RepositoryNode[];
};

export type MergedLanguages = {
  [key: string]: number;
};

export type LanguageWithRepos = {
  name: string;
  color: string;
  totalSize: number;
  percentage: number;
  repoCount: number;
  repositories: {
    name: string;
    url: string;
    size: number;
    percentage: number;
  }[];
};

export type GetLanguageList = () => AsyncNestedAxiosResponse<LanguageNodes>;
