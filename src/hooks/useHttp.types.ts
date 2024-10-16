export interface RequestConfig extends RequestInit {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
}

export interface UseHttpReturn<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  sendRequest: (data?: unknown) => Promise<void>;
  clearData: () => void;
}
