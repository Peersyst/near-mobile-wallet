import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";

const useGetBalance = (index?: number) => {
    const { serviceInstance, index: usedIndex, network, queryEnabled } = useServiceInstance(index);
    return useQuery(["balance", usedIndex, network], () => serviceInstance?.getCKBBalance(), {
        refetchInterval: 1500,
        enabled: queryEnabled,
    });
};

export default useGetBalance;
