import Queries from "../../../query/queries";
import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";

const useGetBalance = (index?: number, onlySelectedWallet?: boolean) => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index, onlySelectedWallet);
    return useQuery([Queries.GET_BALANCE, usedIndex, network], async () => await serviceInstance.getAccountBalance(), {
        refetchInterval: 1500,
        enabled: queryEnabled,
    });
};

export default useGetBalance;
