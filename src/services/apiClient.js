import axios from 'axios';

const BASE_URL = '/api';

/**
 * ============================================================================
 * TIMEOUT PRESETS
 * ============================================================================
 */
export const TIMEOUTS = {
  FAST: 8000,         // 8s: Search autocompletion, status pings
  DEFAULT: 15000,     // 15s: Standard CRUD operations (Jobs, Applications, Auth)
  AI_AGENT: 35000,    // 35s: n8n AI Workflow & multi-tool queries
  PYTHON_AI: 45000,   // 45s: Python FastAPI LLM inference & interview prep
  FILE_UPLOAD: 60000, // 60s: Large PDF / DOCX resume parsing & spaCy extraction
};

/**
 * ============================================================================
 * CANCELLATION UTILITIES & DUPLICATE REQUEST MANAGEMENT
 * ============================================================================
 */
const pendingRequests = new Map();

const generateRequestKey = (config = {}) => {
  const { method, url, params } = config;
  return `${method || 'get'}:${url || ''}:${JSON.stringify(params || {})}`;
};

export const addPendingRequest = (config) => {
  // Automatically cancel older duplicate GET requests to prevent stale responses
  if (config.cancelDuplicate !== false && (config.method || 'get').toLowerCase() === 'get') {
    const requestKey = generateRequestKey(config);
    if (pendingRequests.has(requestKey)) {
      const existingController = pendingRequests.get(requestKey);
      existingController.abort('Canceled by subsequent duplicate request');
      pendingRequests.delete(requestKey);
    }
    const controller = new AbortController();
    config.signal = config.signal || controller.signal;
    pendingRequests.set(requestKey, controller);
  }
};

export const removePendingRequest = (config) => {
  if (config) {
    const requestKey = generateRequestKey(config);
    if (pendingRequests.has(requestKey)) {
      pendingRequests.delete(requestKey);
    }
  }
};

// Check if an error was caused by request cancellation
export const isRequestCancelled = (error) => {
  return (
    axios.isCancel(error) ||
    error?.name === 'CanceledError' ||
    error?.code === 'ERR_CANCELED'
  );
};

// Check if an error was caused by a timeout
export const isRequestTimeout = (error) => {
  return (
    error?.code === 'ECONNABORTED' ||
    Boolean(error?.message && error.message.toLowerCase().includes('timeout'))
  );
};

// Factory to create a dedicated AbortController with helper cancel method
export const createCancelToken = () => {
  const controller = new AbortController();
  return {
    signal: controller.signal,
    cancel: (reason = 'Request cancelled by user') => controller.abort(reason),
  };
};

/**
 * Normalizes Timeout and Cancellation errors for UI consumption
 */
const normalizeError = (error) => {
  if (isRequestCancelled(error)) {
    error.isCancelled = true;
    error.friendlyMessage = 'Request was intentionally cancelled.';
  } else if (isRequestTimeout(error)) {
    const timeoutMs = error.config?.timeout || TIMEOUTS.DEFAULT;
    error.isTimeout = true;
    error.friendlyMessage = `Request timed out after ${timeoutMs / 1000}s. Please check your network connection and try again.`;
  }
  return error;
};

/**
 * ============================================================================
 * URLSearchParams & Query Serialization Helper
 * Serializes nested objects and multi-value arrays (e.g. skills=React&skills=Node)
 * cleanly without broken bracket notation
 * ============================================================================
 */
export const serializeQueryParams = (params) => {
  if (!params) return '';
  if (params instanceof URLSearchParams) return params.toString();

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== undefined && item !== null && item !== '') {
          searchParams.append(key, item);
        }
      });
    } else {
      searchParams.append(key, String(value));
    }
  });
  return searchParams.toString();
};

/**
 * ============================================================================
 * FormData & File Upload Helper with Progress & Cancellation
 * ============================================================================
 * Handles multipart file uploads without manual Content-Type header
 * (allows Axios & browser to correctly calculate multipart boundary string)
 */
export const uploadFile = async (client, url, file, options = {}) => {
  const {
    fieldName = 'file',
    extraFields = {},
    onProgress = null,
    signal = null,
    timeout = TIMEOUTS.FILE_UPLOAD,
  } = options;

  const formData = new FormData();
  if (file) {
    formData.append(fieldName, file);
  }

  Object.entries(extraFields).forEach(([key, val]) => {
    if (val !== undefined && val !== null) {
      if (typeof val === 'object' && !(val instanceof Blob)) {
        formData.append(key, JSON.stringify(val));
      } else {
        formData.append(key, String(val));
      }
    }
  });

  return await client.post(url, formData, {
    timeout,
    signal,
    // Note: Do NOT set Content-Type header; Axios will set multipart/form-data with proper boundary
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(percentCompleted, progressEvent.loaded, progressEvent.total);
      }
    },
  });
};

/**
 * ============================================================================
 * 1. AXIOS PUBLIC INSTANCE
 * ============================================================================
 */
export const axiosPublic = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: TIMEOUTS.DEFAULT,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  paramsSerializer: {
    serialize: serializeQueryParams,
  },
});

axiosPublic.interceptors.request.use(
  (config) => {
    addPendingRequest(config);
    return config;
  },
  (error) => Promise.reject(error)
);

axiosPublic.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config);
    return response;
  },
  (error) => {
    removePendingRequest(error.config);
    return Promise.reject(normalizeError(error));
  }
);

/**
 * ============================================================================
 * 2. AXIOS PRIVATE INSTANCE
 * Protected routes with Auto 401 Refresh + Request Cancellation + Timeout Tracking + CSRF
 * ============================================================================
 */
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: TIMEOUTS.DEFAULT,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  paramsSerializer: {
    serialize: serializeQueryParams,
  },
});

// Refresh token concurrency queue
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

let inMemoryAccessToken = null;

export const setAccessToken = (token) => {
  inMemoryAccessToken = token;
};

export const getAccessToken = () => inMemoryAccessToken;

// Private Request Interceptor
axiosPrivate.interceptors.request.use(
  (config) => {
    addPendingRequest(config);
    const token = getAccessToken();
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Private Response Interceptor
axiosPrivate.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config);
    return response;
  },
  async (error) => {
    removePendingRequest(error.config);

    const originalRequest = error.config;

    // Do not attempt refresh on cancelled or timeout requests
    if (isRequestCancelled(error) || isRequestTimeout(error)) {
      return Promise.reject(normalizeError(error));
    }

    // Skip retry on auth endpoints
    if (
      !originalRequest ||
      originalRequest.url?.includes('/auth/login') ||
      originalRequest.url?.includes('/auth/register') ||
      originalRequest.url?.includes('/auth/refresh-token')
    ) {
      return Promise.reject(normalizeError(error));
    }

    // Trigger refresh on 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (token) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return axiosPrivate(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshResponse = await axiosPublic.post(
          '/auth/refresh-token',
          {},
          { withCredentials: true }
        );

        const newAccessToken =
          refreshResponse.data?.data?.accessToken ||
          refreshResponse.data?.accessToken;

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          processQueue(null, newAccessToken);
          return axiosPrivate(originalRequest);
        }

        processQueue(new Error('No access token returned'));
        return Promise.reject(normalizeError(error));
      } catch (refreshError) {
        processQueue(refreshError, null);
        setAccessToken(null);
        return Promise.reject(normalizeError(refreshError));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(normalizeError(error));
  }
);

/**
 * ============================================================================
 * 3. PYTHON AI & ATS MICROSERVICE CLIENT (Timeout: 45s)
 * ============================================================================
 */
export const pythonApiClient = axios.create({
  baseURL: import.meta.env.VITE_PYTHON_AI_URL || 'http://127.0.0.1:8000',
  timeout: TIMEOUTS.PYTHON_AI,
  headers: {
    'Content-Type': 'application/json',
  },
});

pythonApiClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);

/**
 * ============================================================================
 * 4. n8n AUTONOMOUS AGENT WEBHOOK CLIENT (Timeout: 35s)
 * ============================================================================
 */
export const webhookClient = axios.create({
  baseURL: import.meta.env.VITE_AI_AGENT_WEBHOOK_URL || '/webhook',
  timeout: TIMEOUTS.AI_AGENT,
  headers: {
    'Content-Type': 'application/json',
  },
});

webhookClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(normalizeError(error))
);

// Backward-compatibility alias
export const apiClient = axiosPrivate;
export default axiosPrivate;
