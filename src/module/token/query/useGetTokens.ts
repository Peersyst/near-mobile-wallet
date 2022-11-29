import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { Token } from "near-peersyst-sdk";

const useGetTokens = (index?: number): QueryResult<Token[]> => {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery(
        ["tokens", usedIndex, network],
        async (): Promise<Token[]> => {
            return await serviceInstance.getAccountTokens();
        },
        {
            enabled: false, //TODO: enable when tokens are ready
        },
    );
};

export default useGetTokens;
