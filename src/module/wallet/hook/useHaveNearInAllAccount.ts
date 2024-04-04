import useGetBalanceAllAccounts from "../query/useGetBalanceAllAccounts";

export interface useHaveNearInAllAccountProps {
    isLoading: boolean;
    isHaveNearInAllAccount: boolean;
}
export default function useHaveNearInAllAccount(): useHaveNearInAllAccountProps {
    const { data, isLoading } = useGetBalanceAllAccounts();
    return {
        isLoading,
        isHaveNearInAllAccount: !isLoading && data !== "0",
    };
}
