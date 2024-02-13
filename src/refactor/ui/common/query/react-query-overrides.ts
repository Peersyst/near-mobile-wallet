import {
    useInfiniteQuery,
    InfiniteQueryObserverResult,
    UseQueryResult,
    QueryFunction,
    QueryKey,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
    UseMutationOptions,
} from "react-query";

export interface PaginatedData<TData = unknown> {
    currentPage: number;
    pages: number;
    items: TData;
}

export type MutationOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
>;

type UseCustomInfiniteQuery = <
    TQueryFnData extends PaginatedData = PaginatedData,
    TError = unknown,
    TData = TQueryFnData,
    TQueryKey extends QueryKey = QueryKey,
>(
    queryKey: TQueryKey,
    queryFn: QueryFunction<TQueryFnData, TQueryKey>,
    options?: Omit<
        UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>,
        "queryKey" | "queryFn" | "getNextPageParam"
    >,
) => UseInfiniteQueryResult<TData, TError>;

const useCustomInfiniteQuery: UseCustomInfiniteQuery = (queryKey, queryFn, options) =>
    useInfiniteQuery(queryKey, queryFn, {
        getNextPageParam: ({ currentPage, pages }) => (currentPage < pages ? currentPage + 1 : undefined),
        ...options,
    });

export type InfiniteQueryResult<TData = unknown, TError = unknown> = InfiniteQueryObserverResult<TData, TError>;
export type QueryResult<TData = unknown, TError = unknown> = UseQueryResult<TData, TError>;

export * from "react-query";
export { useCustomInfiniteQuery as useInfiniteQuery };
