import { AxiosResponse } from 'axios';

export type NestedFieldResponse<Response> = {
  data: {
    viewer: {
      [key: string]: Response;
    };
  };
};

type SearchResultNode<Response> = {
  node: Response;
};

export type ListSearchNestedFieldResponse<Response> = {
  data: {
    search: {
      edges: SearchResultNode<Response>[];
    };
  };
};

export type AsyncNestedAxiosResponse<Response> = Promise<
  AxiosResponse<NestedFieldResponse<Response>>
>;

export type AsyncListSearchNestedFieldResponse<Response> = Promise<
  AxiosResponse<ListSearchNestedFieldResponse<Response>>
>;

export type AsyncAxiosResponse<Response> = Promise<AxiosResponse<Response>>;
