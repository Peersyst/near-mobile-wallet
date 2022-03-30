import { Transaction } from "module/transaction/types";
import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import getDaoTransactions from "../mock/getDaoTransactions";

const useGetDaoTransactions = (): QueryResult<Transaction[]> => useQuery(["daoTransactions"], () => getDaoTransactions());

export default useGetDaoTransactions;
