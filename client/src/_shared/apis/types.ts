import { AxiosResponse } from 'axios';

export type AsyncNestedAxiosResponse<Response> = Promise<
  AxiosResponse<NestedFieldResponse<Response>>
>;

export type AsyncAxiosResponse<Response> = Promise<AxiosResponse<Response>>;

export type NestedFieldResponse<Response> = {
  data: {
    viewer: {
      [key: string]: Response;
    };
  };
};
