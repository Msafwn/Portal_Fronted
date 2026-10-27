import { useState, useRef, useEffect, useCallback } from 'react';
import { isRequestCancelled, isRequestTimeout } from '../services/apiClient';

/**
 * Custom React Hook: useCancellableRequest
 * Handles automatic request cancellation on:
 * 1. Component unmount (prevents memory leaks & setState on unmounted component)
 * 2. Rapid re-triggers (e.g. search-as-you-type, role switching tabs)
 * 3. Manual user abort (e.g. "Cancel Analysis" button)
 *
 * Example usage:
 * const { execute, cancel, loading, error, data } = useCancellableRequest();
 *
 * const search = (query) => {
 *   execute(async ({ signal }) => {
 *     return await axiosPublic.get('/jobs', { params: { query }, signal });
 *   });
 * };
 */
export const useCancellableRequest = (options = {}) => {
  const { immediate = false, initialData = null } = options;
  const abortControllerRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);

  // Cancel any ongoing request
  const cancel = useCallback((reason = 'Operation aborted by user') => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(reason);
      abortControllerRef.current = null;
      setLoading(false);
    }
  }, []);

  // Execute request with new AbortController signal
  const execute = useCallback(
    async (requestFn) => {
      // Abort previous in-flight request if any
      if (abortControllerRef.current) {
        abortControllerRef.current.abort('Cancelled by subsequent operation');
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        const result = await requestFn({ signal: controller.signal });
        // Only update state if this request is still the active one
        if (abortControllerRef.current === controller) {
          setData(result?.data || result);
          setLoading(false);
          return result;
        }
      } catch (err) {
        if (abortControllerRef.current === controller) {
          // Check if cancelled vs real error
          if (!isRequestCancelled(err)) {
            setError(err);
          }
          setLoading(false);
          if (!isRequestCancelled(err)) {
            throw err;
          }
        }
      } finally {
        if (abortControllerRef.current === controller) {
          abortControllerRef.current = null;
        }
      }
    },
    []
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort('Component unmounted');
        abortControllerRef.current = null;
      }
    };
  }, []);

  return {
    execute,
    cancel,
    loading,
    data,
    setData,
    error,
    isCancelled: (err) => isRequestCancelled(err),
    isTimeout: (err) => isRequestTimeout(err),
  };
};

export default useCancellableRequest;
