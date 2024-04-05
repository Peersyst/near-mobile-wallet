import useGetBalanceAllAccounts from "../query/useGetAllAccountsBalance";

export interface UseHaveNearInSomeAccountReturn {
    isLoading: boolean;
    haveNearInSomeAccount: boolean;
}
export default function useHaveNearInSomeAccount(): UseHaveNearInSomeAccountReturn {
    const { data, isLoading } = useGetBalanceAllAccounts();
    return {
        isLoading,
        haveNearInSomeAccount: !isLoading && data !== "0",
    };
}
