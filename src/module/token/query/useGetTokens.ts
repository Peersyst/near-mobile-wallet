import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import { Token } from "module/sdk/mock.types";
import useServiceInstance from "module/wallet/hook/useServiceInstance";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery(["tokens", usedIndex, network], async (): Promise<Token[]> => {
        //TODO: remove as
        return (await serviceInstance.getTokensBalance()) as any as Token[];
    });
};

export default useGetTokens;
