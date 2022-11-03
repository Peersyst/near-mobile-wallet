import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { Token } from "module/sdk/mock.types";
import useGetServiceInstance from "module/wallet/hook/useGetServiceInstance";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const { index: usedIndex, network, serviceInstance } = useGetServiceInstance(index);
    return useQuery(["tokens", usedIndex, network], async (): Promise<Token[]> => {
        return (await serviceInstance.getTokensBalance()) as Token[];
    });
};

export default useGetTokens;
