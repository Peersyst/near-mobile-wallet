import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Token } from "near-peersyst-sdk";
import Queries from "../../../query/queries";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery([Queries.GET_FTS, usedIndex, network], async (): Promise<Token[]> => {
        return await serviceInstance.getAccountTokens();
    });
};

export default useGetTokens;
