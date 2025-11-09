import { useState, useEffect } from 'react';
import { ApiClient } from '../services/api';

interface UseFetchOptions<T> {
    initialData?: T;
    dependencies?: any[];
    onSuccess?: (data: T) => void;
    onError?: (error: Error) => void;
}

export function useFetch<T>(
    apiClient: ApiClient,
    url: string,
    options: UseFetchOptions<T> = {}
) {
    const [data, setData] = useState<T | undefined>(options.initialData);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await apiClient.get<T>(url);
                if (isMounted) {
                    setData(result);
                    options.onSuccess?.(result);
                }
            } catch (err) {
                if (isMounted) {
                    const error = err instanceof Error ? err : new Error('An error occurred');
                    setError(error);
                    options.onError?.(error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [...(options.dependencies || []), url]);

    return { data, error, isLoading };
}

interface UseMutationOptions<T, R> {
    onSuccess?: (data: R) => void;
    onError?: (error: Error) => void;
    onSettled?: () => void;
}

export function useMutation<T, R>(
    apiClient: ApiClient,
    url: string,
    method: 'post' | 'put' | 'patch' | 'delete' = 'post',
    options: UseMutationOptions<T, R> = {}
) {
    const [data, setData] = useState<R | undefined>(undefined);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const mutate = async (payload?: T) => {
        try {
            setIsLoading(true);
            const result = await apiClient[method]<R>(url, payload);
            setData(result);
            options.onSuccess?.(result);
            return result;
        } catch (err) {
            const error = err instanceof Error ? err : new Error('An error occurred');
            setError(error);
            options.onError?.(error);
            throw error;
        } finally {
            setIsLoading(false);
            options.onSettled?.();
        }
    };

    return { mutate, data, error, isLoading };
}

interface UseInfiniteQueryOptions<T> {
    pageSize?: number;
    initialData?: T[];
    dependencies?: any[];
    onSuccess?: (data: T[]) => void;
    onError?: (error: Error) => void;
}

export function useInfiniteQuery<T>(
    apiClient: ApiClient,
    url: string,
    options: UseInfiniteQueryOptions<T> = {}
) {
    const [data, setData] = useState<T[]>(options.initialData || []);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);

    const fetchNextPage = async () => {
        if (!hasMore || isLoading) return;

        try {
            setIsLoading(true);
            const result = await apiClient.get<T[]>(`${url}?page=${page}&pageSize=${options.pageSize || 10}`);

            if (result.length < (options.pageSize || 10)) {
                setHasMore(false);
            }

            setData(prev => [...prev, ...result]);
            setPage(prev => prev + 1);
            options.onSuccess?.(result);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('An error occurred');
            setError(error);
            options.onError?.(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { data, error, isLoading, hasMore, fetchNextPage };
}