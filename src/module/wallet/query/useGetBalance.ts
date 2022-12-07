import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";

const useGetBalance = (index?: number) => {
    const { serviceInstance, index: usedIndex, network } = useServiceInstance(index);
    return useQuery(["balance", usedIndex, network], () => serviceInstance.getAccountBalance(), {
        refetchInterval: 1500,
        enabled: !!serviceInstance,
    });
};

export default useGetBalance;
