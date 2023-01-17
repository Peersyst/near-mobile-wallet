import Queries from "../../../query/queries";
import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";
import useSameWallet from "module/wallet/hook/useSameWallet";

const useGetBalance = (index?: number, onlySingleWallet?: boolean) => {
    const { sameWallet } = useSameWallet();
    const { index: usedIndex, network, serviceInstance } = useServiceInstance(index);
    const queryEnabled = !!serviceInstance && (onlySingleWallet ? sameWallet(index) : true);
    return useQuery([Queries.GET_BALANCE, usedIndex, network], async () => await serviceInstance.getAccountBalance(), {
        refetchInterval: 1500,
        enabled: queryEnabled,
    });
};

export default useGetBalance;
