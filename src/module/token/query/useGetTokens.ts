import { QueryResult } from "query-utils";
import { useQuery } from "react-query";
import useServiceInstance from "module/wallet/hook/useServiceInstance";
import { TokenAmount } from "../types";

const useGetTokens = (index?: number): QueryResult<TokenAmount[]> => {
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    return useQuery(["tokens", usedIndex, network], () => serviceInstance.getTokensBalance());
};

export default useGetTokens;
