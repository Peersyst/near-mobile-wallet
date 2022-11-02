import { useQuery } from "react-query";
import useGetServiceInstance from "../hook/useGetServiceInstance";

const useGetBalance = (index?: number) => {
    const { serviceInstance, index: usedIndex, network } = useGetServiceInstance(index);
    return useQuery(["balance", usedIndex, network], () => serviceInstance.getCKBBalance(), {
        refetchInterval: 1500,
    });
};

export default useGetBalance;
