import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosPrivate, axiosPublic, setAccessToken } from '../../services/apiClient';
import { logOut } from '../slices/authSlice';

const axiosBaseQuery =
  () =>
  async (args, api) => {
    try {
      // Normalize args: can be string '/auth/me' or object { url, method, body }
      const requestConfig =
        typeof args === 'string' ? { url: args, method: 'GET' } : args;
      const { url, method = 'GET', body, data, params, headers } = requestConfig;

      const isAuthCall =
        url.includes('/auth/login') || url.includes('/auth/register');

      const client = isAuthCall ? axiosPublic : axiosPrivate;

      const result = await client({
        url,
        method,
        data: body || data,
        params,
        headers,
      });

      // Sync JWT access token into Axios memory
      const returnedAccessToken =
        result.data?.data?.accessToken || result.data?.accessToken;
      if (returnedAccessToken) {
        setAccessToken(returnedAccessToken);
      }

      return { data: result.data };
    } catch (axiosError) {
      const err = axiosError;
      if (err.response?.status === 401 && !isAuthCall) {
        api.dispatch(logOut());
      }
      return {
        error: {
          status: err.response?.status || 500,
          data:
            err.response?.data || {
              message: err.message || 'Network request failed',
            },
        },
      };
    }
  };

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User', 'Job', 'Application', 'Skill'],
  endpoints: () => ({}),
});
