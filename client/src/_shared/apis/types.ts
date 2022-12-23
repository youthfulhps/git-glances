import { AxiosResponse } from 'axios';

export type AsyncAxiosResponse<Response> = Promise<AxiosResponse<Response>>;
