import Queries from "../../../query/queries";
import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";

const useGetBalance = (index?: number) => {
    const { serviceInstance, index: usedIndex, network } = useServiceInstance(index);
    return useQuery([Queries.GET_BALANCE, usedIndex, network], () => serviceInstance.getAccountBalance(), {
        refetchInterval: 1500,
        enabled: !!serviceInstance,
    });
};

export default useGetBalance;
