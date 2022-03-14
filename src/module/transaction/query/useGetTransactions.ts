import { useQuery } from "react-query";
import getTransactions from "module/transaction/mock/getTransactions";

const useGetTransactions = (address?: string) =>
    useQuery(["transactions", address], (): any =>
        address ? getTransactions(address) : new Promise((resolve) => setTimeout(() => resolve([]), 400)),
    );

export default useGetTransactions;
