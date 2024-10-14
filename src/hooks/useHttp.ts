import { useCallback, useEffect, useState } from 'react';

import { UseHttpReturn, RequestConfig } from './useHttp.types.ts';

export default function useHttp<T>(
  url: string,
  config: RequestConfig,
  initialData: T
): UseHttpReturn<T> {
  const [data, setData] = useState<T | null>(initialData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function clearData() {
    setData(initialData);
  }

  const sendRequest = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function sendRequest(data?: any) {
      setIsLoading(true);
      try {
        const resData: T = await sendHttpRequest<T>(url, { ...config, body: data });
        setData(resData);
      } catch (error) {
        setError((error as Error).message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    data,
    isLoading,
    error,
    sendRequest,
    clearData,
  };
}

async function sendHttpRequest<T>(url: string, config: RequestConfig): Promise<T> {
  const response = await fetch(url, config);
  const resData: T = await response.json();
  if (!response.ok) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    throw new Error((resData as any).message || 'Something went wrong, failed to send request.');
  }
  return resData;
}
