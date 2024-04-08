import useGetAllAccountsBalance from "../query/useGetAllAccountsBalance/useGetAllAccountsBalance";

export interface UseHaveNearInSomeAccountReturn {
    isLoading: boolean;
    haveNearInSomeAccount: boolean | undefined;
}
export default function useHaveNearInSomeAccount(): UseHaveNearInSomeAccountReturn {
    const { data, isFetching } = useGetAllAccountsBalance();

    return {
        isLoading: isFetching,
        haveNearInSomeAccount: isFetching ? undefined : data !== "0",
    };
}
