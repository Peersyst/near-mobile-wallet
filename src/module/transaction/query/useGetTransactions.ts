import { useQuery } from "react-query";
import getTransactions from "module/transaction/mock/getTransactions";

const useGetTransactions = (address: string) => useQuery("transactions", () => getTransactions(address));

export default useGetTransactions;
