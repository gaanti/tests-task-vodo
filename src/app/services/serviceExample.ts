import { api } from './@api';

export const serviceExample = api.injectEndpoints({
  endpoints: (builder) => ({
    postSomething: builder.query<postSomethingResponse, postSomethingRequest>({
      query: (loadRequest) => ({
        url: '/my-endpoint-1',
        method: 'POST',
        body: loadRequest,
      }),
    }),
    getSomething: builder.query<getSomethingResponse, getSomethingRequest>({
      query: (loadRequest) => ({
        url: '/my-endpoint-1',
        method: 'GET',
        body: loadRequest,
      }),
    }),
  }),
});

export interface postSomethingResponse {
  postResponseField1: number;
  postResponseField2: string;
}

export interface postSomethingRequest {
  postRequestField1: number;
  postRequestField2: string;
}

export interface getSomethingResponse {
  field1: number;
  field2: string;
}

export interface getSomethingRequest {
  field1: number;
  field2: string;
}
