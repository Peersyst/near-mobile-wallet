import { useQuery } from "react-query";
import { QueryResult } from "query-utils";
import { DaoBalanceType } from "../types";
import getDaoBalance from "../mock/getDaoBalance";

const useGetDaoBalance = ():QueryResult<DaoBalanceType>  => useQuery(["daoBalance"], () => getDaoBalance());

export default useGetDaoBalance;