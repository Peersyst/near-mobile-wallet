import Queries from "../../../query/queries";
import { useQuery } from "react-query";
import useServiceInstance from "../hook/useServiceInstance";

const useGetBalance = (index?: number) => {
    const { index: usedIndex, network, serviceInstance, queryEnabled } = useServiceInstance(index);
    return useQuery([Queries.GET_BALANCE, usedIndex, network], async () => await serviceInstance.getAccountBalance(), {
        enabled: queryEnabled,
    });
};

export default useGetBalance;
