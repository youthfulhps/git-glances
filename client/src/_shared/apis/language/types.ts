import { AsyncNestedAxiosResponse } from '@shared/apis/types';

export type LanguageEdge = {
  size: number;
  node: {
    name: string;
  };
};

export type LanguageEdges = {
  edges: LanguageEdge[];
};

export type LanguageNode = {
  languages: LanguageEdges;
};

export type LanguageNodes = {
  nodes: LanguageNode[];
};

export type MergedLanguages = {
  [key: string]: number;
};

export type GetLanguageList = () => AsyncNestedAxiosResponse<LanguageNodes>;
