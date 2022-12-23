import { AxiosResponse } from 'axios';

export type AsyncAxiosResponse<Response> = Promise<
  AxiosResponse<NestedFieldResponse<Response>>
>;

export type NestedFieldResponse<Response> = {
  data: {
    viewer: {
      [key: string]: Response;
    };
  };
};
